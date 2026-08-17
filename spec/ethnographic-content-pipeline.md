# Ethnographic Content Pipeline

Assisted research pipeline that fetches ethnographic data from verified sources, produces reviewable drafts with citations, and publishes approved content into the app.

## Goals

1. Enrich the map with real ethnographic content for all 22 historical subzones and 6 macro regions.
2. Track provenance — every fact must cite a verified source.
3. Keep humans in the loop — machine output is always a draft until explicitly approved.

## Pipeline overview

```
Source allowlist → Fetch & cache → Extract drafts → Human review → Publish JSON → App
```

| Stage | Location | Git tracked |
|-------|----------|-------------|
| Seeds & config | `data/seeds/`, `scripts/sources/` | Yes |
| Raw HTML/API cache | `data/raw/` | No (gitignored) |
| Drafts (pending review) | `data/drafts/` | No (gitignored) |
| Published subzones | `data/subzones/` | Yes |
| Published macro regions | `data/regions/` | Yes |

## Verified sources

Only domains in [`scripts/sources/allowlist.json`](../scripts/sources/allowlist.json) may be fetched. No open-ended crawling.

| Source | Role | Access |
|--------|------|--------|
| [ETNOMON / CIMEC](https://etnomon.cimec.ro) | 1,600+ ethnographic monuments, filterable by zone | HTTP + HTML parse |
| [Wikipedia RO](https://ro.wikipedia.org) | Zone summaries and geography | MediaWiki REST API |
| [Zone_etnografice.pdf](../artifacts/Zone_etnografice.pdf) | Official baseline geography and villages | Static seed (`data/seeds/pdf-zones.json`) |
| [Muzeul Țăranului Român archive](https://arhiva.muzeultaranuluiroman.ro) | Costumes, rituals, photos | Curated URLs (future) |
| [Muzeul Satului](https://muzeul-satului.ro) | National open-air museum catalog | Curated URLs (future) |

**Compliance rules:**

- Respect `robots.txt`
- Rate limit: 1 request/second (`rateLimitMs: 1000`)
- Store `retrievedAt` + URL for every extracted item
- Prefer APIs over HTML scraping when available

## Subzone mapping

Each of the 22 PDF zones is defined in [`data/seeds/subzones.json`](../data/seeds/subzones.json) with:

- `id` — slug used for filenames (e.g. `maramures`)
- `macroRegionId` — parent macro region
- `historicalRegionNames` — names used in `src/lib/romaniaGeo.ts` map clicks
- `etnomonZoneQueries` — ETNOMON filter values (handles spelling variants)
- `wikiTitle` — Wikipedia RO article title
- `pdfSection` — section number in the PDF seed file

ETNOMON uses many variant zone names (`Maramureş`, `Ţara Moţilor`, etc.). Explicit mappings in the seed file avoid fragile string matching.

**Geo alignment note:** `romaniaGeo.ts` also references zones not in the PDF (`Moldova Centrală`, `Moldova de Nord`). The seed file uses the PDF's 22 zones as canonical; unmapped geo zones fall back to macro-region content.

## Scripts

| npm script | Script file | Purpose |
|------------|-------------|---------|
| `scrape:subzone` | `scripts/scrape/run-subzone.ts` | Build draft for one or all subzones |
| `validate:drafts` | `scripts/validate/validate-drafts.ts` | Zod validation of all drafts |
| `publish:draft` | `scripts/publish/publish-draft.ts` | Copy approved draft → `data/subzones/` |
| `scrape:macro` | `scripts/scrape/run-macro.ts` | Aggregate subzones into macro region files |

### Scraper modules

| Module | File | Input → Output |
|--------|------|----------------|
| Fetch + cache | `scripts/scrape/fetch.ts` | URL → cached HTML/JSON in `data/raw/` |
| Wikipedia | `scripts/scrape/wikipedia.ts` | Article title → summary + citation |
| PDF seed | `scripts/scrape/pdf-seed.ts` | Section number → geography + villages |
| ETNOMON | `scripts/scrape/etnomon.ts` | Zone query → monuments → traditions |
| Draft builder | `scripts/extract/draft-builder.ts` | Seed → combined draft JSON |

### Extraction rules (conservative)

- **Wikipedia** → `summary`, `geography` (lead section only)
- **PDF seed** → `representativeVillages`, baseline `summary` if Wikipedia is missing
- **ETNOMON** → `traditions` (architecture/installations), `images` (with museum credit)
- **Never invent** games or costumes — prefer empty categories over hallucinated content
- Low-confidence inferences are marked `"confidence": "low"` in drafts

## Workflow

### 1. Scrape

```bash
npm run scrape:subzone -- --id maramures
```

Writes `data/drafts/maramures.json` with `status: "draft"`.

### 2. Review

Open the draft file. Edit descriptions, remove incorrect items, verify citations. Set:

```json
"status": "approved"
```

### 3. Validate

```bash
npm run validate:drafts
```

### 4. Publish

```bash
npm run publish:draft -- maramures
```

Copies approved content (without draft metadata) to `data/subzones/maramures.json`.

### 5. Aggregate macro regions (optional)

```bash
npm run scrape:macro -- --force
```

Rolls up highlights from published subzones into `data/regions/*.json`. Without `--force`, skips macro regions that already have multiple curated items.

## Current status

All 22 subzones have been scraped, validated, and published. Macro region files have been aggregated from subzone content. Content quality varies by zone — ETNOMON coverage depends on how well each zone name maps to their database filters. Drafts can be re-scraped and republished at any time.

## Future work

- Curated MTR archive URLs per subzone
- Europeana API for licensed images
- Manual enrichment of games and costumes (not reliably extractable from monument catalogs)
- Re-scrape schedule when source databases are updated
