import type { RegionId } from "@/types/region";

type Coordinate = [number, number];

type Geometry = {
  type: "Polygon";
  coordinates: Coordinate[][];
};

type RegionFeature = {
  type: "Feature";
  id: RegionId;
  properties: {
    regionId: RegionId;
    name: string;
  };
  geometry: Geometry;
};

type RegionFeatureCollection = {
  type: "FeatureCollection";
  features: RegionFeature[];
};

export const romaniaGeo: RegionFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "maramures",
      properties: { regionId: "maramures", name: "Maramures" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [22.62, 47.65],
            [23.05, 47.55],
            [23.55, 47.57],
            [24.15, 47.78],
            [24.22, 48.05],
            [23.95, 48.3],
            [23.35, 48.33],
            [22.9, 48.15],
            [22.62, 47.65]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "moldova",
      properties: { regionId: "moldova", name: "Moldova" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [26.15, 45.85],
            [26.65, 45.95],
            [27.55, 46.15],
            [28.35, 46.6],
            [28.95, 47.15],
            [28.8, 47.95],
            [28.1, 48.2],
            [27.25, 48.0],
            [26.55, 47.45],
            [26.2, 46.7],
            [26.15, 45.85]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "oltenia",
      properties: { regionId: "oltenia", name: "Oltenia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [22.2, 43.7],
            [23.1, 43.65],
            [24.0, 43.8],
            [24.65, 44.2],
            [24.75, 44.9],
            [24.35, 45.25],
            [23.55, 45.2],
            [22.9, 44.95],
            [22.35, 44.35],
            [22.2, 43.7]
          ]
        ]
      }
    }
  ]
};
