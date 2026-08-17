import type { MediaAsset, SourceCitation } from "../../src/types/region.ts";
import { fetchJsonCached } from "./fetch.ts";

type WikiSummaryResponse = {
  title: string;
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
  thumbnail?: { source?: string; width?: number; height?: number };
  originalimage?: { source?: string; width?: number; height?: number };
};

export type WikipediaResult = {
  summary: string | null;
  geography: string | null;
  citation: SourceCitation | null;
  image: MediaAsset | null;
};

export async function fetchWikipediaSummary(
  wikiTitle: string,
  subzoneId: string
): Promise<WikipediaResult> {
  const encodedTitle = encodeURIComponent(wikiTitle.replace(/ /g, "_"));
  const url = `https://ro.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`;

  try {
    const { data, retrievedAt } = await fetchJsonCached<WikiSummaryResponse>(url);
    const pageUrl = data.content_urls?.desktop?.page ?? `https://ro.wikipedia.org/wiki/${encodedTitle}`;
    const extract = data.extract?.trim() ?? null;

    const citation: SourceCitation = {
      url: pageUrl,
      title: data.title,
      retrievedAt,
      license: "CC BY-SA 4.0",
      excerpt: extract?.slice(0, 280)
    };

    const imageSrc = data.thumbnail?.source ?? data.originalimage?.source;
    const image: MediaAsset | null = imageSrc
      ? {
          id: `${subzoneId}-wiki-img`,
          src: imageSrc,
          alt: data.title,
          credit: "Wikipedia",
          sources: [citation]
        }
      : null;

    if (!extract) {
      return { summary: null, geography: null, citation: image ? citation : null, image };
    }

    return {
      summary: extract,
      geography: extract,
      citation,
      image
    };
  } catch {
    return { summary: null, geography: null, citation: null, image: null };
  }
}
