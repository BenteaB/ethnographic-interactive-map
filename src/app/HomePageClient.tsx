"use client";

import { useMemo, useState } from "react";
import { RegionMap } from "@/components/Map";
import { RegionPanel } from "@/components/RegionPanel";
import { getRegionContent } from "@/lib/regions";
import { getSubzoneFromLookup } from "@/lib/subzones";
import type { RegionContent, RegionId, RegionSelectionContext, SubzoneContent } from "@/types/region";
import styles from "./page.module.css";
import { useI18n } from "@/contexts/I18nContext";

type HomePageClientProps = {
  subzoneLookupRo: Record<string, SubzoneContent>;
  subzoneLookupEn: Record<string, SubzoneContent>;
};

export function HomePageClient({ subzoneLookupRo, subzoneLookupEn }: HomePageClientProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);
  const [selectedContext, setSelectedContext] = useState<RegionSelectionContext | null>(null);
  const { language } = useI18n();

  const selectedRegion: RegionContent | null = useMemo(() => {
    if (!selectedRegionId) return null;
    return getRegionContent(selectedRegionId, language);
  }, [selectedRegionId, language]);

  const subzoneLookup = language === "en" ? subzoneLookupEn : subzoneLookupRo;

  const selectedSubzone: SubzoneContent | null = useMemo(() => {
    if (!selectedContext?.subzone) return null;
    return getSubzoneFromLookup(subzoneLookup, selectedContext.subzone);
  }, [selectedContext, subzoneLookup]);

  function handleSelectRegion(regionId: RegionId, context: RegionSelectionContext) {
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
  }

  function handleClearSelection() {
    setSelectedRegionId(null);
    setSelectedContext(null);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Ethnographic Interactive Map</h1>
        <p>
          Select a region to discover traditional games, costumes, and local customs. Content is
          sourced from verified ethnographic references.
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
            subzone={selectedSubzone}
            selectedContext={selectedContext}
            onClearSelection={handleClearSelection}
          />
        </div>
      </section>
    </main>
  );
}
