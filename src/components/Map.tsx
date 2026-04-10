"use client";

import { romaniaGeo } from "@/lib/romaniaGeo";
import type { RegionId } from "@/types/region";
import styles from "./Map.module.css";

type RegionMapProps = {
  selectedRegionId: RegionId | null;
  onSelectRegion: (regionId: RegionId) => void;
};

const regionLabels: Record<RegionId, [number, number]> = {
  maramures: [23.5, 48.0],
  moldova: [27.5, 47.0],
  oltenia: [23.7, 44.4]
};

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 700;

function projectPoint([lon, lat]: [number, number]) {
  const [minLon, maxLon] = [21.5, 29.5];
  const [minLat, maxLat] = [43.0, 48.8];
  const x = ((lon - minLon) / (maxLon - minLon)) * VIEWBOX_WIDTH;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * VIEWBOX_HEIGHT;
  return [x, y] as const;
}

export function RegionMap({ selectedRegionId, onSelectRegion }: RegionMapProps) {
  return (
    <section className={styles.wrapper} aria-label="Interactive map of Romania regions">
      <svg
        className={styles.map}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        role="img"
        aria-label="Interactive map of Romania regions"
      >
        {romaniaGeo.features.map((feature) => {
          const regionId = feature.properties.regionId;
          const isSelected = selectedRegionId === regionId;
          const points = feature.geometry.coordinates[0]
            .map((coord) => {
              const [x, y] = projectPoint(coord as [number, number]);
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polygon
              key={regionId}
              points={points}
              className={styles.geography}
              onClick={() => onSelectRegion(regionId)}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Select ${feature.properties.name}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectRegion(regionId);
                }
              }}
              fill={isSelected ? "#d97706" : "#f6e7cb"}
            />
          );
        })}

        {Object.entries(regionLabels).map(([regionId, coordinates]) => {
          const [x, y] = projectPoint(coordinates);
          return (
            <text key={regionId} x={x} y={y} className={styles.markerText} textAnchor="middle">
              {regionId}
            </text>
          );
        })}
      </svg>
    </section>
  );
}
