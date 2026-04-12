# Andrej Karpathy Skills & Principles

This project follows the principles outlined in [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) to ensure high-quality, maintainable, and surgical code changes.

## 1. Think Before Coding
Before making any changes, especially complex ones:
- **State Assumptions:** Explicitly list what you assume about the existing code and data.
- **Propose Tradeoffs:** Identify at least two ways to solve the problem (e.g., Simple vs. Scalable) and justify the chosen path.
- **Define Success:** Describe how you will verify the change (tests, manual checks, etc.).
- **Push Back:** If a request can be solved with significantly less code or a simpler approach, suggest it.

## 2. Simplicity First
- **Avoid Over-engineering:** Do not add "just-in-case" abstractions or complex patterns for simple problems.
- **Minimal Dependencies:** Prefer vanilla CSS and built-in React/Next.js features over adding new libraries.
- **Readable Logic:** Prioritize code that is easy to follow over clever or overly concise solutions.

## 3. Surgical Changes
- **Targeted Edits:** Only modify code directly related to the task.
- **No Unrelated Cleanup:** Avoid refactoring adjacent code, fixing unrelated lint errors, or changing formatting unless explicitly requested.
- **Minimize Side Effects:** Be mindful of how your changes impact other parts of the system.

## 4. Goal-Driven Execution
- **Reproduction First:** For bug fixes, always create a reproduction (script or test) before applying the fix.
- **Verification Loop:** Follow the "Plan -> Act -> Validate" cycle rigorously.
- **Automated Tests:** Add or update tests for every functional change.

## Tech Stack Specifics
- **Next.js 15:** Use App Router conventions.
- **TypeScript:** Maintain strict typing without unnecessary casts or `any`.
- **CSS Modules:** Keep styles local to components and avoid global pollution.
- **GeoJSON:** Be mindful of file sizes and performance when transforming data.
