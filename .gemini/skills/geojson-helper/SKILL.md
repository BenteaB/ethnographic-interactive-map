---
name: geojson-helper
description: Assists with validating, simplifying, and optimizing GeoJSON files for the interactive map. Ensures compliance with project-specific schemas and administrative boundary standards.
---

# GeoJSON Helper Skill

This skill provides expertise in handling GeoJSON data, following the "Simplicity First" and "Surgical Changes" principles from [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

## Core Responsibilities:

### 1. Optimization & Validation
- **Validation:** Verify that GeoJSON files follow the `CountyFeatureProperties` and `RegionFeatureProperties` schemas. See [references/schemas.md](references/schemas.md).
- **Simplification:** Use appropriate tools (like `mapshaper` logic) to reduce file size while maintaining boundary integrity.
- **Transformation:** Assist in mapping administrative boundaries to ethnographic macro-regions using the `toEthnographicGeo` logic.

### 2. Simplicity & Surgicality
- **Minimalist Geometry:** Prioritize the highest level of simplification that still conveys the region's shape to keep the application fast.
- **Surgical Edits:** When modifying boundaries, only touch the specific coordinates or properties that need adjustment. Avoid complete re-generation of files if a surgical edit is possible.
- **Performance First:** Avoid complex nested properties or excessive metadata within GeoJSON features.

## Usage Guidelines:
- Use when adding new ethnographic data or modifying existing boundary files.
- Prioritize performance by keeping GeoJSON files as small as possible without losing critical detail.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
