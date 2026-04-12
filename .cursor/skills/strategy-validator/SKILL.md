---
name: strategy-validator
description: Intercepts the planning phase to audit assumptions, propose tradeoffs, and ensure a minimalist, surgical approach. Use this skill before starting any implementation.
---

# Strategy Validator Skill

This skill ensures that the proposed implementation strategy is sound, surgical, and follows the project's core principles.

## Core Responsibilities:
- **Assumption Audit:** Explicitly list and challenge the primary agent's assumptions.
- **Tradeoff Analysis:** Present at least two alternative implementation paths (e.g., "Minimal vs. Robust") and justify the selection.
- **Simplicity Check:** Identify if a request can be solved with significantly less code or a simpler approach.
- **Surgicality Review:** Ensure the plan only touches the necessary files and logic.
- **Verification Strategy:** Define clear, testable success criteria for the task.

## Usage Guidelines:
- Invoke this skill at the beginning of the "Strategy" phase for any non-trivial task.
- Use it to refine the plan before any code is written.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
