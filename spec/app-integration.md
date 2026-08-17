# App Integration

How published ethnographic content reaches the interactive map UI.

## Data loading

| Layer | Module | When |
|-------|--------|------|
| Macro regions | `src/lib/regions.ts` | Build time — static JSON imports |
| Subzones | `src/lib/subzones.server.ts` | Server render — reads `data/subzones/*.json` |
| Name lookup | `src/lib/subzones.ts` | Client — maps historical region names to content |

The home page is split:

- `src/app/page.tsx` — server component, loads subzones and builds lookup
- `src/app/HomePageClient.tsx` — client component, map state and interactions

## Map → panel flow

1. User clicks a county on the Leaflet map (`LeafletRegionMap.tsx`).
2. `onSelectRegion` fires with `regionId` (macro) and `selectedContext` (`county`, `subzone`).
3. `HomePageClient` resolves:
   - Macro content via `getRegionContent(regionId)`
   - Subzone content via `getSubzoneFromLookup(lookup, selectedContext.subzone)`
4. `RegionPanel` merges both:
   - Subzone summary, geography, and villages take priority
   - Per category (games/costumes/traditions): subzone items if present, else macro fallback
   - Sources from both levels are deduplicated and listed

## Region panel sections

When a county is selected:

| Section | Source |
|---------|--------|
| Title | Subzone name (e.g. "Maramureș") |
| Summary | Subzone, falling back to macro |
| Geography | Subzone only |
| Representative villages | Subzone only |
| Historical region / county | Map click context |
| Games / Costumes / Traditions tabs | Subzone first, macro fallback |
| Images | Subzone first, macro fallback |
| Sources | Combined citations with links |

When no county is selected, the panel shows the placeholder prompt.

## Historical name resolution

Map clicks provide a `subzone` string from `romaniaGeo.ts` (e.g. `"Maramureş"`). The lookup normalizes diacritics and matches against `historicalRegionNames` in the seed file.

Zones in the geo mapping that are not in the PDF seed (e.g. `Moldova Centrală`) have no subzone file and fall back to macro content only.

## Adding new content

After publishing a subzone JSON file, restart the dev server (or rebuild) so the server component re-reads `data/subzones/`. No code changes are required for new subzone files — the loader reads the directory at runtime.

Macro region updates from `npm run scrape:macro` are picked up automatically via static imports in `regions.ts` after a rebuild.

## Related specs

- [Ethnographic Content Pipeline](./ethnographic-content-pipeline.md)
- [Content Model](./content-model.md)
- [Architecture overview](../artifacts/ARCHITECTURE.md)
