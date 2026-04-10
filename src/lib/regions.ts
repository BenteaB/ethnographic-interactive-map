import maramuresRaw from "../../data/regions/maramures.json";
import moldovaRaw from "../../data/regions/moldova.json";
import olteniaRaw from "../../data/regions/oltenia.json";
import { regionContentSchema, type RegionContent, type RegionId } from "@/types/region";

const rawData: Record<RegionId, unknown> = {
  maramures: maramuresRaw,
  moldova: moldovaRaw,
  oltenia: olteniaRaw
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
