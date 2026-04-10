"use client";

import dynamic from "next/dynamic";
import type { RegionId } from "@/types/region";

type RegionMapProps = {
  selectedRegionId: RegionId | null;
  onSelectRegion: (regionId: RegionId) => void;
};

const LeafletRegionMap = dynamic(
  () => import("./LeafletRegionMap").then((module) => module.LeafletRegionMap),
  { ssr: false }
);

export function RegionMap({ selectedRegionId, onSelectRegion }: RegionMapProps) {
  return <LeafletRegionMap selectedRegionId={selectedRegionId} onSelectRegion={onSelectRegion} />;
}
