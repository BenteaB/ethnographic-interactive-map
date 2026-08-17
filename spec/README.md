# Project Specifications

Documentation for the ethnographic interactive map — architecture decisions, data models, and operational workflows.

## Documents

| Document | Description |
|----------|-------------|
| [Ethnographic Content Pipeline](./ethnographic-content-pipeline.md) | How ethnographic data is scraped, reviewed, and published |
| [Content Model](./content-model.md) | JSON schemas, file layout, and region/subzone hierarchy |
| [App Integration](./app-integration.md) | How published content flows into the map UI |

## Quick reference

```bash
# Scrape one subzone into a draft
npm run scrape:subzone -- --id maramures

# Scrape all 22 subzones
npm run scrape:subzone -- --all

# Validate draft JSON
npm run validate:drafts

# Validate published subzone + macro region JSON
npm run validate:published

# Publish an approved draft (status must be "approved")
npm run publish:draft -- maramures

# Aggregate published subzones into macro region files
npm run scrape:macro -- --force
```

## Scope

- **6 macro regions:** Transilvania, Banat, Oltenia, Muntenia, Moldova, Dobrogea
- **22 historical subzones:** from [Zone_etnografice.pdf](../artifacts/Zone_etnografice.pdf)
- **Content categories:** games, costumes, traditions, images — each with source citations
