import transilvaniaRaw from "../../data/regions/transilvania.json";
import banatRaw from "../../data/regions/banat.json";
import olteniaRaw from "../../data/regions/oltenia.json";
import munteniaRaw from "../../data/regions/muntenia.json";
import moldovaRaw from "../../data/regions/moldova.json";
import dobrogeaRaw from "../../data/regions/dobrogea.json";
import { regionContentSchema, type RegionContent, type RegionId } from "@/types/region";

const rawData: Record<RegionId, unknown> = {
  transilvania: transilvaniaRaw,
  banat: banatRaw,
  oltenia: olteniaRaw,
  muntenia: munteniaRaw,
  moldova: moldovaRaw,
  dobrogea: dobrogeaRaw
};

const regionsById = Object.fromEntries(
  Object.entries(rawData).map(([id, data]) => [id, regionContentSchema.parse(data)])
) as Record<RegionId, RegionContent>;

export function getRegionContent(regionId: RegionId): RegionContent {
  return regionsById[regionId];
}

export function getAllRegions(): RegionContent[] {
  return Object.values(regionsById);
}
