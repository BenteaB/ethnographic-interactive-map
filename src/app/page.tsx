"use client";

import { useMemo, useState } from "react";
import { RegionMap } from "@/components/Map";
import { RegionPanel } from "@/components/RegionPanel";
import { getRegionContent } from "@/lib/regions";
import type { RegionContent, RegionId } from "@/types/region";
import styles from "./page.module.css";

export default function HomePage() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const selectedRegion: RegionContent | null = useMemo(() => {
    if (!selectedRegionId) return null;
    return getRegionContent(selectedRegionId);
  }, [selectedRegionId]);

  function handleSelectRegion(regionId: RegionId) {
    setSelectedRegionId(regionId);
    setMobilePanelOpen(true);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Ethnographic Interactive Map</h1>
        <p>
          Select a region to discover traditional games, costumes, and local customs. MVP
          currently includes 3 seeded regions.
        </p>
      </header>

      <section className={styles.layout}>
        <div className={styles.mapColumn}>
          <RegionMap selectedRegionId={selectedRegionId} onSelectRegion={handleSelectRegion} />
        </div>
        <div className={styles.panelColumn}>
          <RegionPanel
            region={selectedRegion}
            isOpen={mobilePanelOpen}
            onOpenChange={setMobilePanelOpen}
          />
        </div>
      </section>
    </main>
  );
}
