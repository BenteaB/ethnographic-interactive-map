import * as cheerio from "cheerio";
import type { MediaAsset, RegionItem, SourceCitation } from "../../src/types/region.ts";
import { normalizeRegionName, slugify } from "../lib/paths.ts";
import { fetchCached } from "./fetch.ts";

export type EtnomonMonument = {
  name: string;
  localName: string;
  museum: string;
  provenance: string;
  zone: string;
  ethnicity: string;
  dating: string;
  imageSrc?: string;
};

export type EtnomonResult = {
  monuments: EtnomonMonument[];
  traditions: RegionItem[];
  images: MediaAsset[];
  citation: SourceCitation;
};

const ETNOMON_ORIGIN = "https://etnomon.cimec.ro";

function isMonumentPhoto(src: string | undefined): boolean {
  if (!src) return false;
  return !src.includes("placeholder_timbru") && !src.includes("/images/logo.gif");
}

function resolveImageSrc(rawSrc: string | undefined): string | undefined {
  if (!rawSrc) return undefined;
  if (rawSrc.startsWith("http")) return rawSrc;
  return `${ETNOMON_ORIGIN}${rawSrc.startsWith("/") ? rawSrc : `/${rawSrc}`}`;
}

function parseMonumentTable(html: string): EtnomonMonument[] {
  const $ = cheerio.load(html);
  const monuments: EtnomonMonument[] = [];

  $("table.table tr").each((_index, row) => {
    const $row = $(row);
    const cells = $row.find("td");
    if (cells.length < 8) return;

    const numText = $(cells[0]).text().replace(/\s/g, "");
    if (!numText || Number.isNaN(Number(numText))) return;

    const imageSrc = resolveImageSrc($row.find("td.img img").attr("src"));

    monuments.push({
      name: $(cells[2]).text().replace(/\s+/g, " ").trim(),
      localName: $(cells[3]).text().replace(/\s+/g, " ").trim(),
      museum: $(cells[4]).text().replace(/\s+/g, " ").trim(),
      provenance: $(cells[5]).text().replace(/\s+/g, " ").trim(),
      zone: $(cells[6]).text().replace(/\s+/g, " ").trim(),
      ethnicity: $(cells[7]).text().replace(/\s+/g, " ").trim(),
      dating: $(cells[8]).text().replace(/\s+/g, " ").trim(),
      imageSrc
    });
  });

  return monuments;
}

function zoneMatches(monumentZone: string, zoneQueries: string[]): boolean {
  const normalizedMonumentZone = normalizeRegionName(monumentZone);
  return zoneQueries.some((query) => {
    const normalizedQuery = normalizeRegionName(query);
    return (
      normalizedMonumentZone.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedMonumentZone)
    );
  });
}

function monumentToTradition(
  monument: EtnomonMonument,
  citation: SourceCitation,
  index: number
): RegionItem {
  const descriptionParts = [
    monument.provenance ? `Proveniență: ${monument.provenance}.` : null,
    monument.museum ? `Muzeu: ${monument.museum}.` : null,
    monument.dating ? `Dată: ${monument.dating}.` : null,
    monument.ethnicity ? `Etnie: ${monument.ethnicity}.` : null,
    monument.zone ? `Zonă: ${monument.zone}.` : null
  ].filter(Boolean);

  return {
    id: slugify(`etnomon-${monument.localName || monument.name}-${index}`),
    name: monument.localName || monument.name,
    description: descriptionParts.join(" ") || monument.name,
    sources: [citation]
  };
}

function buildImages(
  monuments: EtnomonMonument[],
  subzoneId: string,
  citation: SourceCitation
): MediaAsset[] {
  return monuments
    .filter((monument) => isMonumentPhoto(monument.imageSrc))
    .slice(0, 4)
    .map((monument, index) => ({
      id: `${subzoneId}-etnomon-img-${index + 1}`,
      src: monument.imageSrc!,
      alt: monument.localName || monument.name,
      credit: `ETNOMON / ${monument.museum}`,
      sources: [citation]
    }));
}

export async function fetchEtnomonZone(
  zoneQuery: string,
  subzoneId: string,
  allZoneQueries: string[] = [zoneQuery]
): Promise<EtnomonResult | null> {
  const url = `${ETNOMON_ORIGIN}/index.asp?zona=${encodeURIComponent(zoneQuery)}`;

  try {
    const { html, retrievedAt } = await fetchCached(url);
    const allMonuments = parseMonumentTable(html);
    const monuments = allMonuments.filter((monument) => zoneMatches(monument.zone, allZoneQueries));
    if (monuments.length === 0) return null;

    const citation: SourceCitation = {
      url,
      title: `ETNOMON – ${zoneQuery}`,
      retrievedAt,
      license: "Institutul Național al Patrimoniului",
      excerpt: `${monuments.length} monumente etnografice`
    };

    const topMonuments = monuments.slice(0, 12);
    const traditions = topMonuments.map((monument, index) =>
      monumentToTradition(monument, citation, index)
    );
    const images = buildImages(monuments, subzoneId, citation);

    return { monuments, traditions, images, citation };
  } catch {
    return null;
  }
}

export async function fetchEtnomonForSubzone(
  zoneQueries: string[],
  subzoneId: string
): Promise<EtnomonResult | null> {
  for (const query of zoneQueries) {
    const result = await fetchEtnomonZone(query, subzoneId, zoneQueries);
    if (result && result.monuments.length > 0) {
      return result;
    }
  }
  return null;
}

export async function fetchAllEtnomonPages(
  zoneQuery: string,
  subzoneId: string,
  zoneQueries: string[] = [zoneQuery],
  maxPages = 5
): Promise<EtnomonResult | null> {
  const allMonuments: EtnomonMonument[] = [];
  let citation: SourceCitation | null = null;

  for (let page = 1; page <= maxPages; page += 1) {
    const pageParam = page === 1 ? "" : `&page=${page}`;
    const url = `${ETNOMON_ORIGIN}/index.asp?zona=${encodeURIComponent(zoneQuery)}${pageParam}`;
    try {
      const { html, retrievedAt } = await fetchCached(url);
      const pageMonuments = parseMonumentTable(html).filter((monument) =>
        zoneMatches(monument.zone, zoneQueries)
      );
      if (pageMonuments.length === 0) break;
      allMonuments.push(...pageMonuments);
      citation = {
        url,
        title: `ETNOMON – ${zoneQuery}`,
        retrievedAt,
        license: "Institutul Național al Patrimoniului",
        excerpt: `${pageMonuments.length} monumente (pagina ${page})`
      };
    } catch {
      break;
    }
  }

  if (allMonuments.length === 0 || !citation) return null;

  const traditions = allMonuments.slice(0, 15).map((monument, index) =>
    monumentToTradition(monument, citation!, index)
  );
  const images = buildImages(allMonuments, subzoneId, citation);

  return { monuments: allMonuments, traditions, images, citation };
}
