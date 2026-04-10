import maramuresRaw from "../../data/regions/maramures.json";
import moldovaRaw from "../../data/regions/moldova.json";
import olteniaRaw from "../../data/regions/oltenia.json";
import {
  regionContentSchema,
  type RegionContent,
  type RegionId
} from "@/types/region";

function parseRegion(data: unknown): RegionContent {
  return regionContentSchema.parse(data);
}

const regionsById: Record<RegionId, RegionContent> = {
  maramures: parseRegion(maramuresRaw),
  moldova: parseRegion(moldovaRaw),
  oltenia: parseRegion(olteniaRaw)
};

export function getRegionContent(regionId: RegionId): RegionContent {
  return regionsById[regionId];
}

export function getAllRegions(): RegionContent[] {
  return Object.values(regionsById);
}
