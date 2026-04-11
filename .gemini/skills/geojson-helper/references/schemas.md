# GeoJSON Schemas for the Ethnographic Map

## CountyFeatureProperties
Raw administrative boundaries from source GeoJSON files.
```typescript
type CountyFeatureProperties = {
  shapeName: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
};
```

## RegionFeatureProperties
The schema used by the application after mapping to ethnographic regions.
```typescript
type RegionFeatureProperties = {
  regionId: "transilvania" | "banat" | "oltenia" | "muntenia" | "moldova" | "dobrogea" | "unmapped";
  name: string;
  county: string;
  subzone: string;
};
```
