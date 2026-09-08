import fs from "node:fs/promises";
import {
  subzoneSeedsFileSchema,
  type ContentDraft,
  type MediaAsset,
  type SourceCitation,
  type SubzoneSeed
} from "../../src/types/region.ts";
import { paths, pdfSourceCitation } from "../lib/paths.ts";
import { fetchAllEtnomonPages } from "../scrape/etnomon.ts";
import { loadPdfSeed } from "../scrape/pdf-seed.ts";
import { fetchWikipediaSummary } from "../scrape/wikipedia.ts";

export async function loadSubzoneSeeds(): Promise<SubzoneSeed[]> {
  const raw = await fs.readFile(paths.subzoneSeeds, "utf8");
  const parsed = subzoneSeedsFileSchema.parse(JSON.parse(raw));
  return parsed.subzones;
}

export async function getSubzoneSeed(id: string): Promise<SubzoneSeed | null> {
  const seeds = await loadSubzoneSeeds();
  return seeds.find((seed) => seed.id === id) ?? null;
}

function uniqueCitations(citations: (SourceCitation | null | undefined)[]): SourceCitation[] {
  const seen = new Set<string>();
  const result: SourceCitation[] = [];
  for (const citation of citations) {
    if (!citation || seen.has(citation.url)) continue;
    seen.add(citation.url);
    result.push(citation);
  }
  return result;
}

export async function buildSubzoneDraft(seed: SubzoneSeed): Promise<ContentDraft> {
  const extractedFrom: SourceCitation[] = [];
  let summary: string | null = null;
  let geography: string | null = null;
  let villages: string[] = [];
  let wikiImage: MediaAsset | null = null;

  if (seed.wikiTitle) {
    const wiki = await fetchWikipediaSummary(seed.wikiTitle, seed.id);
    if (wiki.citation) extractedFrom.push(wiki.citation);
    summary = wiki.summary;
    geography = wiki.geography;
    if (wiki.image) {
      wikiImage = wiki.image;
    }
  }

  if (seed.pdfSection) {
    const pdf = await loadPdfSeed(seed.pdfSection);
    if (pdf) {
      extractedFrom.push({
        url: pdfSourceCitation.url,
        title: pdfSourceCitation.title,
        retrievedAt: new Date().toISOString(),
        excerpt: pdf.summary?.slice(0, 200) ?? undefined
      });
      if (!summary) summary = pdf.summary;
      if (!geography) geography = pdf.geography;
      villages = pdf.villages;
    }
  }

  const etnomon = await fetchAllEtnomonPages(
    seed.etnomonZoneQueries[0]!,
    seed.id,
    seed.etnomonZoneQueries
  );
  if (etnomon) {
    extractedFrom.push(etnomon.citation);
  }

  const etnomonImages = etnomon?.images ?? [];
  const images = etnomonImages.length > 0 ? etnomonImages : wikiImage ? [wikiImage] : [];

  const draft: ContentDraft = {
    id: seed.id,
    name: seed.name,
    macroRegionId: seed.macroRegionId,
    summary: summary ?? `${seed.name} – zonă etnografică din România.`,
    geography: geography ?? undefined,
    representativeVillages: villages.length > 0 ? villages : undefined,
    games: [],
    costumes: [],
    traditions: [],
    images,
    sources: uniqueCitations(extractedFrom),
    status: "draft",
    confidence: etnomon ? "medium" : summary ? "high" : "low",
    extractedFrom: uniqueCitations(extractedFrom),
    notes: etnomon
      ? `ETNOMON: ${etnomon.monuments.length} monumente găsite pentru ${seed.etnomonZoneQueries[0]}.`
      : "ETNOMON: niciun rezultat – verificați manual mapping-ul zonei."
  };

  return draft;
}

export async function writeDraft(draft: ContentDraft): Promise<string> {
  await fs.mkdir(paths.draftsDir, { recursive: true });
  const outputPath = `${paths.draftsDir}/${draft.id}.json`;
  await fs.writeFile(outputPath, JSON.stringify(draft, null, 2), "utf8");
  return outputPath;
}
