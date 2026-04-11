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

/**
 * Pure style generator that relies on CSS variables for design consistency.
 * This is defined outside the component to avoid unnecessary re-creation.
 */
function getFeatureStyle(
  isInSelectedRegion: boolean,
  isSelectedSubzone: boolean,
  isInHoveredRegion: boolean
): PathOptions {
  if (isSelectedSubzone) {
    return {
      color: "var(--map-stroke-active)",
      weight: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-weight-selected")),
      fillColor: "var(--map-fill-active)",
      fillOpacity: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-opacity-selected"))
    };
  }

  if (isInSelectedRegion) {
    return {
      color: "var(--map-stroke-active)",
      weight: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-weight-region")),
      fillColor: "var(--map-fill-idle)",
      fillOpacity: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-opacity-region"))
    };
  }

  if (isInHoveredRegion) {
    return {
      color: "var(--map-stroke-active)",
      weight: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-weight-hover")),
      fillColor: "var(--map-fill-idle)",
      fillOpacity: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-opacity-hover"))
    };
  }

  return {
    color: "var(--map-stroke-idle)",
    weight: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--map-weight-idle")),
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

  /**
   * Memoize the style function to prevent expensive map-wide recalculations 
   * unless the relevant selection or hover state actually changes.
   */
  const mapStyle = useCallback(
    (feature: Feature | undefined) => {
      const props = feature?.properties as RegionFeatureProperties | undefined;
      if (!props) return getFeatureStyle(false, false, false);

      const isInRegion = props.regionId === selectedRegionId;
      const isSubzone =
        isInRegion &&
        props.county.replaceAll("_", " ") === selectedContext?.county &&
        props.subzone === selectedContext?.subzone;

      const isHovered = props.regionId === hoveredRegionId;

      return getFeatureStyle(isInRegion, isSubzone, isHovered);
    },
    [selectedRegionId, selectedContext, hoveredRegionId]
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onClear={onClearSelection} />
        {regionGeo ? (
          <GeoJSON
            data={regionGeo}
            style={mapStyle}
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
