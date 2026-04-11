# Accessibility Best Practices

## ARIA Roles & Labels
*   Use `aria-label` for interactive elements without visible text (e.g., "Back to map" button).
*   Apply `role="application"` or similar for the interactive map if appropriate for complex behaviors.
*   Ensure `aria-expanded` and `aria-controls` are correctly set for tabs and panels.

## Keyboard Navigation
*   Interactive elements must be focusable via `tab`.
*   Maintain a logical tab order (Map -> Selected Region -> Details Panel).
*   Implement focus trapping for modal dialogs if they are ever reintroduced.

## Semantic HTML
*   Use `<main>`, `<header>`, `<section>`, `<aside>`, and `<article>` correctly.
*   Maintain proper heading hierarchy (h1 -> h2 -> h3).
