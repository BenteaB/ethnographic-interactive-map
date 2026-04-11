---
name: review-changes
description: Analyzes code for LLM smells, prioritizes simplicity and scalability, and identifies redundancy or repetitive code. Use this skill when a code review is requested.
---

# Review Changes Skill

This skill is designed to review code changes from the perspective of a senior engineer, focusing on simplicity, scalability, and identifying potential LLM-specific issues ("LLM smells") or areas of redundancy.

## How to Use

When asked to review code changes or provide feedback on code quality, use this skill. The core prompt guiding this review is:

"Please check the changes for any LLM smell and review my code like a senior who prioritises simplicity and scalability. Look for opportunities to reduce redundancy and repetitive code."

## Key Review Criteria:

*   **LLM Smells:** Look for verbose or generic comments, unnatural phrasing, boilerplate code that doesn't add value, or any indicators that the code might have been generated without sufficient understanding or context.
*   **Simplicity:** Assess if the code is easy to understand, has clear logic, and avoids unnecessary complexity.
*   **Scalability:** Evaluate how well the code would handle increased data, more features, or future growth. Consider architectural choices, data structures, and algorithm efficiency.
*   **Redundancy/Repetitive Code:** Identify duplicated logic, styles, or structures that could be abstracted or consolidated.
*   **Prioritization:** Focus on simplicity and scalability as primary goals.

## Example Scenario

**User Request:** "Review my recent changes for LLM smells and code quality."

**Gemini CLI Action:** Invoke the `review-changes` skill, passing the relevant code context to the LLM with the core prompt.

---
**Note:** This skill assumes the code context to be reviewed is available in the current session or can be provided.
