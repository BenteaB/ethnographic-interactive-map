# Accessibility Audit Skill

This skill ensures the Ethnographic Interactive Map is inclusive and accessible, following the "Simplicity First" and "Surgical Changes" principles from [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

## Core Responsibilities:

### 1. ARIA & Standards
- **Standard Adherence:** Verify correct usage of `aria-label`, `role`, and other accessibility attributes.
- **Keyboard Navigation:** Audit focus management, especially for modals, tabs, and map interactions.
- **Visual Accessibility:** Check color contrast and ensure semantic HTML usage.

### 2. Simplicity & Surgicality
- **Minimalist ARIA:** Avoid adding redundant ARIA attributes if native HTML elements (e.g., `<button>`, `<nav>`) already provide the necessary semantics.
- **Surgical Edits:** When fixing accessibility issues, limit changes strictly to the relevant component or element. Avoid global or unrelated layout changes.
- **Readable Structure:** Prioritize clear, semantic DOM structures over complex, aria-heavy workarounds.

## Usage Guidelines:
- Use during UI component development or when refactoring layouts.
- Prioritize the user experience for assistive technology users without over-engineering the code.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
