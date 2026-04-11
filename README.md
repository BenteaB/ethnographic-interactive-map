# Ethnographic Interactive Map

Interactive map showcasing regional ethnographic traditions and cultural knowledge, featuring a realistic Romania basemap with granular subzone highlighting.

## Tech Stack

- **Next.js 15** (App Router + TypeScript)
- **Leaflet & React Leaflet** (Interactive map with GeoJSON overlays)
- **Radix UI** (Tabs and Dialog for accessible UI)
- **Zod** (Data validation and type inference)
- **CSS Modules** (Vanilla CSS for styling)

## Features

- **Macro-Region Navigation**: High-level view of Romania's ethnographic macro-regions (Transilvania, Banat, Oltenia, etc.).
- **Granular Subzones**: Interactive highlighting of individual subzones (counties) within their larger macro-regions.
- **Cultural Content**: Rich details on traditional games, costumes, and traditions for each region.
- **Responsive Design**: Optimized for both desktop and mobile with a modal-based detail view on small screens.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current Project Scope

- 6 Macro-regions: Transilvania, Banat, Oltenia, Muntenia, Moldova, Dobrogea.
- Over 40 mapped subzones based on official Romanian administrative boundaries.
- Local JSON content system with strict schema validation.

## Deploy

1. Push `main` branch to GitHub.
2. Import repository in Vercel.
3. Keep default framework detection (Next.js).
4. Deploy.
