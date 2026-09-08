# Content Model

Type definitions live in [`src/types/region.ts`](../src/types/region.ts). All published JSON is validated at runtime with Zod.

## Hierarchy

```
Macro region (6)          e.g. Transilvania
  └── Historical subzone (22)   e.g. Maramureș, Țara Moților
        └── County (41)         e.g. Maramureș county — map click target
```

- **Macro regions** — high-level ethnographic areas shown in the region panel when no county is selected.
- **Historical subzones** — finer zones from the official PDF, shown when a county is clicked.
- **Counties** — administrative boundaries on the map; each maps to one historical subzone via `src/lib/romaniaGeo.ts`.

## Schemas

### Source citation

Every extracted or published item should trace back to a source.

```typescript
{
  url: string;           // Full URL
  title: string;         // Page or dataset title
  retrievedAt: string; // ISO 8601 datetime
  license?: string;      // e.g. "CC BY-SA 4.0"
  excerpt?: string;      // Short quote or description
}
```

### Region item

Used for games, costumes, and traditions.

```typescript
{
  id: string;
  name: string;
  description: string;
  sources?: SourceCitation[];
}
```

### Media asset

```typescript
{
  id: string;
  src: string;
  alt: string;
  credit?: string;
  sources?: SourceCitation[];
}
```

### Macro region content

File: `data/regions/{macro-id}.json`

```typescript
{
  id: "transilvania" | "banat" | "oltenia" | "muntenia" | "moldova" | "dobrogea";
  code: string;          // e.g. "RO-TR"
  name: string;
  summary: string;
  games: RegionItem[];
  costumes: RegionItem[];
  traditions: RegionItem[];
  images: MediaAsset[];
  sources: SourceCitation[];
}
```

### Subzone content

File: `data/subzones/{subzone-id}.json`

```typescript
{
  id: string;                    // slug, e.g. "maramures"
  name: string;                  // display name, e.g. "Maramureș"
  macroRegionId: RegionId;
  summary: string;
  geography?: string;
  representativeVillages?: string[];
  games: RegionItem[];
  costumes: RegionItem[];
  traditions: RegionItem[];
  images: MediaAsset[];
  sources: SourceCitation[];
}
```

### Content draft

File: `data/drafts/{subzone-id}.json` — same as subzone content plus review metadata:

```typescript
{
  ...SubzoneContent,
  status: "draft" | "approved" | "rejected";
  confidence: "high" | "medium" | "low";
  extractedFrom: SourceCitation[];
  notes?: string;
}
```

Only drafts with `"status": "approved"` can be published.

## File layout

```
data/
  seeds/
    subzones.json       # 22 zone definitions + source mappings
    pdf-zones.json      # PDF paragraph seeds per zone
  regions/              # Published macro content (6 files)
  subzones/             # Published subzone content (22 files)
  drafts/               # Machine output pending review (gitignored)
  raw/                  # Cached fetch responses (gitignored)
```

## The 22 historical subzones

| ID | Name | Macro region |
|----|------|--------------|
| `bran` | Bran | transilvania |
| `tara-motilor` | Țara Moților | transilvania |
| `gorj` | Gorj | oltenia |
| `tara-oasului` | Țara Oașului | transilvania |
| `tinutul-nasaudului` | Ținutul Năsăudului | transilvania |
| `tara-fagarasului` | Țara Făgărașului | transilvania |
| `harghita-covasna` | Harghita – Covasna | transilvania |
| `tinutul-neamtului` | Ținutul Neamțului | moldova |
| `podisul-tarnavelor` | Podișul Târnavelor | transilvania |
| `sudul-munteniei` | Sudul Munteniei | muntenia |
| `tulcea-delta-dunarii` | Tulcea și Delta Dunării | dobrogea |
| `valcea` | Vâlcea | oltenia |
| `tara-hategului` | Țara Hațegului | transilvania |
| `obcinele-sucevei` | Obcinele Sucevei | moldova |
| `campia-timisului-aradului` | Câmpia Timișului și Câmpia Aradului | banat |
| `dealurile-clujului` | Dealurile Clujului | transilvania |
| `muscelele-argesului` | Muscelele Argeșului | muntenia |
| `maramures` | Maramureș | transilvania |
| `marginimea-sibiului` | Mărginimea Sibiului | transilvania |
| `campia-olteniei` | Câmpia Olteniei | oltenia |
| `valea-prahovei` | Valea Prahovei | muntenia |
| `vrancea` | Vrancea | moldova |

Full mappings (ETNOMON queries, Wikipedia titles, geo name aliases) are in `data/seeds/subzones.json`.
