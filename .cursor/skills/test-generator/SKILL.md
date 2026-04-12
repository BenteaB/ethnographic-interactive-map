# Test Generator Skill

This skill automates the creation of high-quality unit tests, following the "Goal-Driven Execution" and "Reproduction First" principles from [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

## Core Responsibilities:

### 1. Reproduction First (Bugs)
- **Mandatory Reproduction:** For bug fixes, *always* generate a failing test case that reproduces the reported issue *before* implementing the fix.
- **Verification:** Ensure the test case accurately captures the failure state.

### 2. Goal-Driven Execution (Features)
- **Success Criteria:** For new features or logic, generate tests that define the "success" criteria before or during implementation.
- **Edge Case Coverage:** Identify and test potential issues like unmapped counties, malformed GeoJSON features, or unexpected data structures.

### 3. Functional Logic & Standards
- **Targeted Tests:** Focus on pure functions in `src/lib/` (e.g., `toEthnographicGeo`, `normalizeCountyName`).
- **Project Standards:** Ensure tests follow established conventions (using Jest/Vitest).

## Usage Guidelines:
- Invoke this skill at the start of any bug fix or new feature implementation that involves functional logic.
- Prioritize clear, descriptive test cases that serve as documentation for the intended behavior.

## Feedback Loop (CRITICAL):
If the user provides feedback on the results or suggests improvements to the skill's performance, the agent MUST rewrite or update this skill's instructions and bundled resources accordingly to better meet the user's needs.
