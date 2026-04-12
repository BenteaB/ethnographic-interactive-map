---
name: i18n-manager
description: Streamlines the translation process for Romanian and English. Identifies missing translation keys and ensures consistent naming conventions across region JSON files.
---

# I18n Manager Skill

This skill manages the internationalization of ethnographic content, following the "Simplicity First" and "Surgical Changes" principles from [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

## Core Responsibilities:

### 1. Translation & Audit
- **Translation Audit:** Identify missing translations in region-specific JSON files. See [references/conventions.md](references/conventions.md).
- **Consistency:** Ensure consistent naming conventions for translation keys.
- **New Translations:** Assist in translating content between Romanian and English.

### 2. Simplicity & Surgicality
- **High-Signal Translations:** Prioritize translating key cultural terms and descriptions clearly rather than providing multiple verbose options.
- **Surgical Translation:** When adding a new translation, only modify the specific keys needed. Avoid reordering or reformatting the entire translation file.
- **Minimalist Keys:** Keep translation keys descriptive but concise.

## Usage Guidelines:
- Use when updating region data or adding new content that requires translation.
- Prioritize cultural context and linguistic accuracy while maintaining surgical precision in code edits.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
