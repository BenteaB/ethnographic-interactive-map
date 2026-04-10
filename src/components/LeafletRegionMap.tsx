"use client";

import type { Feature } from "geojson";
import type { Layer, LatLngBoundsExpression, PathOptions } from "leaflet";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { romaniaGeo, type RegionFeatureProperties } from "@/lib/romaniaGeo";
import type { RegionId } from "@/types/region";
import styles from "./Map.module.css";

type RegionMapProps = {
  selectedRegionId: RegionId | null;
  onSelectRegion: (regionId: RegionId) => void;
};

const romaniaBounds: LatLngBoundsExpression = [
  [43.3, 20.6],
  [48.6, 29.9]
];

function getRegionStyle(isSelected: boolean): PathOptions {
  return {
    color: isSelected ? "#92400e" : "#9a7a4f",
    weight: isSelected ? 3 : 2,
    fillColor: isSelected ? "#d97706" : "#f6e7cb",
    fillOpacity: isSelected ? 0.62 : 0.38
  };
}

export function LeafletRegionMap({ selectedRegionId, onSelectRegion }: RegionMapProps) {
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
        <GeoJSON
          data={romaniaGeo}
          style={(feature) => {
            const regionId = (feature as Feature)?.properties?.regionId;
            return getRegionStyle(regionId === selectedRegionId);
          }}
          onEachFeature={(feature: Feature, layer: Layer) => {
            const { name, regionId } = feature.properties as RegionFeatureProperties;
            layer.bindTooltip(name, { direction: "center", permanent: false, sticky: true });
            layer.on("click", () => onSelectRegion(regionId));
          }}
        />
      </MapContainer>
    </section>
  );
}
