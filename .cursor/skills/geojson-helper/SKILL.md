---
name: geojson-helper
description: Assists with validating, simplifying, and optimizing GeoJSON files for the interactive map. Ensures compliance with project-specific schemas and administrative boundary standards.
---

# GeoJSON Helper Skill

This skill provides expertise in handling GeoJSON data for the Ethnographic Interactive Map.

## Core Responsibilities:
* **Validation:** Verify that GeoJSON files follow the `CountyFeatureProperties` and `RegionFeatureProperties` schemas.
* **Simplification:** Use appropriate tools (like `mapshaper` logic) to reduce file size while maintaining boundary integrity.
* **Transformation:** Assist in mapping administrative boundaries to ethnographic macro-regions using the `toEthnographicGeo` logic.

## Usage Guidelines:
* Use when adding new ethnographic data or modifying existing boundary files.
* Prioritize performance by keeping GeoJSON files as small as possible without losing critical detail.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
