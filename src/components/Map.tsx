"use client";

import dynamic from "next/dynamic";
import type { RegionId, RegionSelectionContext } from "@/types/region";

type RegionMapProps = {
  selectedRegionId: RegionId | null;
  selectedContext: RegionSelectionContext | null;
  onSelectRegion: (regionId: RegionId, context: RegionSelectionContext) => void;
  onClearSelection: () => void;
};

const LeafletRegionMap = dynamic(
  () => import("./LeafletRegionMap").then((module) => module.LeafletRegionMap),
  { ssr: false }
);

export function RegionMap({
  selectedRegionId,
  selectedContext,
  onSelectRegion,
  onClearSelection
}: RegionMapProps) {
  return (
    <LeafletRegionMap
      selectedRegionId={selectedRegionId}
      selectedContext={selectedContext}
      onSelectRegion={onSelectRegion}
      onClearSelection={onClearSelection}
    />
  );
}
