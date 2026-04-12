---
name: content-architect
description: Manages region-specific JSON data in `data/regions/`. Ensures content follows defined schemas and maintains consistency across ethnographic categories (games, costumes, traditions).
---

# Content Architect Skill

This skill ensures the consistency and quality of ethnographic content, following the "Simplicity First" and "Surgical Changes" principles from [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

## Core Responsibilities:

### 1. Content & Schema
- **Schema Adherence:** Validate all region JSON files against the `regionContentSchema` from `src/types/region.ts`. See [references/templates.md](references/templates.md).
- **Standardization:** Ensure consistent formatting and level of detail across different regions.
- **Content Generation:** Assist in creating new region files based on ethnographic research, following established patterns.

### 2. Simplicity & Surgicality
- **Minimalist Content:** Avoid overly verbose or redundant descriptions. Focus on high-signal cultural information.
- **Surgical Updates:** When updating region data, limit changes strictly to the target fields or sections. Avoid restructuring the entire JSON file unless necessary.
- **Clean Patterns:** Maintain simple, flat data structures where possible to ease consumption by the UI.

## Usage Guidelines:
- Use when adding new regions or updating existing ethnographic content.
- Prioritize cultural accuracy and descriptive clarity without unnecessary complexity.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
