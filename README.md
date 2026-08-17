# Ethnographic Interactive Map

Interactive map showcasing regional ethnographic traditions and cultural knowledge, featuring a realistic Romania basemap with granular subzone highlighting.

## Tech Stack

- **Next.js 15** (App Router + TypeScript)
- **Leaflet & React Leaflet** (Interactive map with GeoJSON overlays)
- **Radix UI** (Tabs and Dialog for accessible UI)
- **Zod** (Data validation and type inference)
- **CSS Modules** (Vanilla CSS for styling)

## Features

- **Macro-region navigation**: 6 ethnographic macro-regions (Transilvania, Banat, Oltenia, Muntenia, Moldova, Dobrogea).
- **Historical subzones**: 22 PDF-defined zones; clicking a county shows subzone-specific geography, villages, images, and sources.
- **Source citations**: Games, costumes, traditions, and images link back to verified sources (ETNOMON, Wikipedia, official PDF baseline).
- **Content pipeline**: Scrape → review → publish workflow for maintaining subzone JSON (see `spec/`).
- **Responsive design**: Optimized for desktop and mobile with a modal-based detail view on small screens.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Pipeline

```bash
# Scrape one subzone into a draft
npm run scrape:subzone -- --id maramures

# Validate draft JSON
npm run validate:drafts

# Publish an approved draft (status must be "approved")
npm run publish:draft -- maramures

# Validate all published subzone + macro region files
npm run validate:published

# Aggregate published subzones into macro region files
npm run scrape:macro -- --force
```

Full documentation: [`spec/README.md`](spec/README.md).

## Deploy

1. Push `main` branch to GitHub.
2. Import repository in Vercel.
3. Keep default framework detection (Next.js).
4. Deploy.

Run `npm run validate:published` before deploying to catch schema or citation issues.
