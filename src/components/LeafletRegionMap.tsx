"use client";

import type { Feature } from "geojson";
import L, { type Layer, type LatLngBoundsExpression, type PathOptions } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import {
  toEthnographicGeo,
  type CountyFeatureCollection,
  type RegionFeatureCollection,
  type RegionFeatureProperties
} from "@/lib/romaniaGeo";
import type { RegionId as EthnographicRegionId } from "@/types/region"; 
import type { RegionSelectionContext } from "@/types/region"; 
import styles from "./Map.module.css";

type RegionMapProps = {
  selectedRegionId: EthnographicRegionId | null;
  selectedContext: RegionSelectionContext | null;
  onSelectRegion: (regionId: EthnographicRegionId, context: RegionSelectionContext) => void;
  onClearSelection: () => void;
};

function MapEvents({ onClear }: { onClear: () => void }) {
  useMapEvents({
    click: () => onClear()
  });
  return null;
}

const romaniaBounds: LatLngBoundsExpression = [
  [43.3, 20.6],
  [48.6, 29.9]
];

/**
 * Pure style generator that relies on CSS variables for design consistency.
 * This is defined outside the component to avoid unnecessary re-creation.
 */
function getFeatureStyle(
  isInMacroRegion: boolean,
  isHistoricalSelected: boolean,
  isHistoricalHovered: boolean
): PathOptions {
  // Priority 1: Selected Historical Region
  if (isHistoricalSelected) {
    return {
      color: "var(--map-stroke-active)",
      weight: 3,
      fillColor: "var(--map-fill-active)",
      fillOpacity: 0.8
    };
  }

  // Priority 2: Hovered Historical Region
  if (isHistoricalHovered) {
    return {
      color: "var(--map-stroke-active)",
      weight: 2,
      fillColor: "var(--map-fill-idle)",
      fillOpacity: 0.6
    };
  }

  // Priority 3: Macro-region (Transilvania, etc.) - show boundaries but no fill
  if (isInMacroRegion) {
    return {
      color: "var(--map-stroke-idle)",
      weight: 1.5,
      fillColor: "var(--map-fill-idle)",
      fillOpacity: 0.1
    };
  }

  // Default: Inactive/Unrelated
  return {
    color: "var(--color-border)",
    weight: 0.5,
    fillColor: "transparent",
    fillOpacity: 0
  };
}

export function LeafletRegionMap({
  selectedRegionId,
  selectedContext,
  onSelectRegion,
  onClearSelection
}: RegionMapProps) {
  const [regionGeo, setRegionGeo] = useState<RegionFeatureCollection | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<EthnographicRegionId | null>(null);
  const [hoveredHistoricalRegion, setHoveredHistoricalRegion] = useState<string | null>(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false); // State to track screen width

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 899px)"); // Matches the breakpoint from CSS
    const updateViewport = () => setIsNarrowScreen(mediaQuery.matches);

    updateViewport(); // Set initial state
    mediaQuery.addEventListener("change", updateViewport); // Listen for changes

    // Correct cleanup: removeEventListener expects the exact same event type and listener function
    return () => mediaQuery.removeEventListener("change", updateViewport); 
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadBoundaries() {
      const response = await fetch("/data/romania-adm1-simplified.geojson");
      const countyGeo = (await response.json()) as CountyFeatureCollection;
      if (isMounted) {
        setRegionGeo(toEthnographicGeo(countyGeo));
      }
    }
    void loadBoundaries();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Memoize the style function to prevent expensive map-wide recalculations
   * unless the relevant selection or hover state actually changes.
   */
  const mapStyle = useCallback(
    (feature: Feature | undefined) => {
      const props = feature?.properties as RegionFeatureProperties | undefined;
      if (!props || props.regionId === "unmapped") {
        return getFeatureStyle(false, false, false);
      }

      // 1. Is it part of the currently selected historical region?
      const isSelectedHistorical = props.historicalRegion === selectedContext?.subzone;

      // 2. Is it part of the currently hovered historical region?
      const isHoveredHistorical = props.historicalRegion === hoveredHistoricalRegion;

      // 3. Is it part of the macro-region (Transilvania, etc.)?
      const isInMacroRegion = props.regionId === selectedRegionId || props.regionId === hoveredRegionId;

      return getFeatureStyle(isInMacroRegion, isSelectedHistorical, isHoveredHistorical);
    },
    [selectedRegionId, selectedContext, hoveredRegionId, hoveredHistoricalRegion]
  );

  return (
    <section className={styles.wrapper} aria-label="Interactive map of Romania regions">
      <MapContainer
        className={styles.leafletMap}
        center={[45.95, 24.97]}
        zoom={6}
        minZoom={6}
        maxZoom={9}
        maxBounds={romaniaBounds}
        zoomControl
        scrollWheelZoom={!isNarrowScreen} // Conditionally enable/disable zoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onClear={onClearSelection} />
        {regionGeo ? (
          <GeoJSON
            key={`geo-${hoveredHistoricalRegion}-${selectedContext?.subzone}`}
            data={regionGeo}
            style={mapStyle}
            onEachFeature={(feature: Feature, layer: Layer) => {
              const props = feature.properties as RegionFeatureProperties;
              
              if (props.regionId !== "unmapped") {
                const { name, regionId, county, historicalRegion } = props;
                const countyLabel = county.replaceAll("_", " ");

                // Prioritize Historical Region in tooltip
                layer.bindTooltip(`<strong>${historicalRegion}</strong><br/>${name} (${countyLabel})`, {
                  direction: "center",
                  permanent: false,
                  sticky: true,
                  className: styles.mapTooltip
                });

                layer.on({
                  click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    // Pass historicalRegion as the subzone to ensure grouping works
                    onSelectRegion(regionId, {
                      county: countyLabel,
                      subzone: historicalRegion
                    });
                  },
                  mouseover: () => {
                    setHoveredRegionId(regionId);
                    setHoveredHistoricalRegion(historicalRegion);
                  },
                  mouseout: () => {
                    setHoveredRegionId(null);
                    setHoveredHistoricalRegion(null);
                  }
                });
              } else {
                layer.off("click mouseover mouseout");
                layer.bindTooltip("Unmapped region", { direction: "center", permanent: false, sticky: true });
              }
            }}
          />
        ) : null}
      </MapContainer>
    </section>
  );
}
