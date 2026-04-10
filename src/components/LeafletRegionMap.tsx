"use client";

import type { Feature } from "geojson";
import L, { type Layer, type LatLngBoundsExpression, type PathOptions } from "leaflet";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import {
  toEthnographicGeo,
  type CountyFeatureCollection,
  type RegionFeatureCollection,
  type RegionFeatureProperties
} from "@/lib/romaniaGeo";
import type { RegionId, RegionSelectionContext } from "@/types/region";
import styles from "./Map.module.css";

type RegionMapProps = {
  selectedRegionId: RegionId | null;
  selectedContext: RegionSelectionContext | null;
  onSelectRegion: (regionId: RegionId, context: RegionSelectionContext) => void;
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

function getFeatureStyle(
  isInSelectedRegion: boolean,
  isSelectedSubzone: boolean,
  isInHoveredRegion: boolean
): PathOptions {
  // If a subzone is explicitly selected, it gets the "active" highlight
  if (isSelectedSubzone) {
    return {
      color: "var(--map-stroke-active)",
      weight: 3.5,
      fillColor: "var(--map-fill-active)",
      fillOpacity: 0.75
    };
  }

  // If we are in the macro-region of the selection, show a subtle border and light fill
  if (isInSelectedRegion) {
    return {
      color: "var(--map-stroke-active)",
      weight: 1.5,
      fillColor: "var(--map-fill-idle)",
      fillOpacity: 0.2
    };
  }

  // Hover effect: only active when NOTHING is selected
  if (isInHoveredRegion) {
    return {
      color: "var(--map-stroke-active)",
      weight: 2,
      fillColor: "var(--map-fill-idle)",
      fillOpacity: 0.4
    };
  }

  // Default state for unselected, unhovered regions
  return {
    color: "var(--map-stroke-idle)",
    weight: 0.6,
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
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);

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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onClear={onClearSelection} />
        {regionGeo ? (
          <GeoJSON
            data={regionGeo}
            style={(feature) => {
              const props = feature?.properties as RegionFeatureProperties | undefined;
              if (!props) return getFeatureStyle(false, false, false);

              const isInRegion = props.regionId === selectedRegionId;
              const isSubzone =
                isInRegion &&
                props.county.replaceAll("_", " ") === selectedContext?.county &&
                props.subzone === selectedContext?.subzone;

              // Hover logic: only relevant if NO macro-region is currently selected
              const isHovered = !selectedRegionId && props.regionId === hoveredRegionId;

              return getFeatureStyle(isInRegion, isSubzone, isHovered);
            }}
            onEachFeature={(feature: Feature, layer: Layer) => {
              const { name, regionId, county, subzone } = feature.properties as RegionFeatureProperties;
              const countyLabel = county.replaceAll("_", " ");

              layer.bindTooltip(`${name} - ${subzone} (${countyLabel})`, {
                direction: "center",
                permanent: false,
                sticky: true
              });

              layer.on({
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  onSelectRegion(regionId, {
                    county: countyLabel,
                    subzone
                  });
                },
                mouseover: () => setHoveredRegionId(regionId),
                mouseout: () => setHoveredRegionId(null)
              });
            }}
          />
        ) : null}
      </MapContainer>
    </section>
  );
}
