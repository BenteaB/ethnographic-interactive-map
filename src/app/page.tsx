"use client";

import { useMemo, useState } from "react";
import { RegionMap } from "@/components/Map";
import { RegionPanel } from "@/components/RegionPanel";
import { getRegionContent } from "@/lib/regions";
import type { RegionContent, RegionId, RegionSelectionContext } from "@/types/region";
import styles from "./page.module.css";

export default function HomePage() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);
  const [selectedContext, setSelectedContext] = useState<RegionSelectionContext | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const selectedRegion: RegionContent | null = useMemo(() => {
    if (!selectedRegionId) return null;
    return getRegionContent(selectedRegionId);
  }, [selectedRegionId]);

  function handleSelectRegion(regionId: RegionId, context: RegionSelectionContext) {
    // If the same subzone is clicked again, deselect it (toggle)
    if (
      selectedRegionId === regionId &&
      selectedContext?.county === context.county &&
      selectedContext?.subzone === context.subzone
    ) {
      handleClearSelection();
      return;
    }

    setSelectedRegionId(regionId);
    setSelectedContext(context);
    // Only open the modal panel on mobile layouts.
    if (window.matchMedia("(max-width: 899px)").matches) {
      setMobilePanelOpen(true);
    }
  }

  function handleClearSelection() {
    setSelectedRegionId(null);
    setSelectedContext(null);
    setMobilePanelOpen(false);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Ethnographic Interactive Map</h1>
        <p>
          Select a region to discover traditional games, costumes, and local customs. MVP currently
          includes 6 macro ethnographic regions.
        </p>
      </header>

      <section className={styles.layout}>
        <div className={styles.mapColumn}>
          <RegionMap
            selectedRegionId={selectedRegionId}
            selectedContext={selectedContext}
            onSelectRegion={handleSelectRegion}
            onClearSelection={handleClearSelection}
          />
        </div>
        <div className={styles.panelColumn}>
          <RegionPanel
            region={selectedRegion}
            selectedContext={selectedContext}
            isOpen={mobilePanelOpen}
            onOpenChange={setMobilePanelOpen}
            onClearSelection={handleClearSelection}
          />
        </div>
      </section>
    </main>
  );
}
