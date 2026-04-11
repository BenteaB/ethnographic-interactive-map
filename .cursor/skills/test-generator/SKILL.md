---
name: test-generator
description: Automatically generates unit tests for pure functional logic within `src/lib/`. Focuses on edge cases and transformation accuracy for GeoJSON and regional data.
---

# Test Generator Skill

This skill automates the creation of high-quality unit tests for the application's core logic.

## Core Responsibilities:
* **Functional Logic:** Generate tests for pure functions in `src/lib/` (e.g., `toEthnographicGeo`, `normalizeCountyName`).
* **Edge Cases:** Identify and test potential issues like unmapped counties or malformed GeoJSON features.
* **Test Standards:** Ensure generated tests follow project conventions (e.g., using Jest or Vitest).

## Usage Guidelines:
* Use when implementing new data transformation logic or refactoring existing libraries.
* Prioritize clear test descriptions and comprehensive coverage.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
