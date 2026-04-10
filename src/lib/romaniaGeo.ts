import type { RegionId } from "@/types/region";

type Geometry = {
  type: "Polygon";
  coordinates: number[][][];
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
            [22.6, 47.6],
            [24.5, 47.6],
            [24.5, 48.3],
            [22.6, 48.3],
            [22.6, 47.6]
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
            [26.3, 46.0],
            [28.8, 46.0],
            [28.8, 47.9],
            [26.3, 47.9],
            [26.3, 46.0]
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
            [22.6, 43.6],
            [24.9, 43.6],
            [24.9, 45.2],
            [22.6, 45.2],
            [22.6, 43.6]
          ]
        ]
      }
    }
  ]
};
