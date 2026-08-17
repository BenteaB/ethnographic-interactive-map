import subzoneSeedsRaw from "../../data/seeds/subzones.json";
import { subzoneSeedsFileSchema, type SubzoneContent } from "@/types/region";
import { normalizeRegionName } from "./normalize";

const seeds = subzoneSeedsFileSchema.parse(subzoneSeedsRaw).subzones;

export function buildSubzoneLookup(subzones: SubzoneContent[]): Record<string, SubzoneContent> {
  const byId = Object.fromEntries(subzones.map((subzone) => [subzone.id, subzone]));
  const lookup: Record<string, SubzoneContent> = {};

  for (const seed of seeds) {
    const content = byId[seed.id];
    if (!content) continue;
    for (const name of seed.historicalRegionNames) {
      lookup[normalizeRegionName(name)] = content;
    }
  }

  return lookup;
}

export function getSubzoneFromLookup(
  lookup: Record<string, SubzoneContent>,
  historicalRegionName: string
): SubzoneContent | null {
  return lookup[normalizeRegionName(historicalRegionName)] ?? null;
}

export function resolveSubzoneId(historicalRegionName: string): string | null {
  for (const seed of seeds) {
    if (seed.historicalRegionNames.some((name) => normalizeRegionName(name) === normalizeRegionName(historicalRegionName))) {
      return seed.id;
    }
  }
  return null;
}
