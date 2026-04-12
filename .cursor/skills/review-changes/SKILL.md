# Review Changes Skill

**Purpose:** To review code changes like a senior engineer, prioritizing simplicity, surgical edits, and identifying "LLM smells" or redundant code. Follows [Andrej Karpathy's skills guide](https://github.com/forrestchang/andrej-karpathy-skills).

**Core Principles:**

### 1. Simplicity First
- **Avoid Over-engineering:** Look for unnecessary abstractions, "just-in-case" logic, or complex patterns where a simpler solution exists.
- **Minimalist Code:** Identify redundant code, duplicated logic, or boilerplate that doesn't add value.
- **Readability:** Ensure the code is easy to follow and avoid overly clever or obfuscated implementations.

### 2. Surgical Changes
- **Task Focus:** Ensure changes are strictly related to the requested task.
- **No Unrelated Cleanup:** Flag any "drive-by" refactoring, unrelated formatting changes, or fixes for non-essential lint errors.
- **Side Effect Audit:** Evaluate if the changes could have unintended consequences in other parts of the application.

### 3. LLM Smells
- **Verbose Comments:** Flag comments that state the obvious or are overly wordy.
- **Generic Phrasing:** Identify unnatural-sounding variable names or phrasing typical of AI-generated content.
- **Disconnected Logic:** Look for code that doesn't fully understand the project's existing context or conventions.

### 4. Goal-Driven Execution
- **Verification:** Confirm that the changes are accompanied by appropriate tests or a clear verification strategy.
- **Correctness:** Ensure the implementation fully addresses the core requirement without missing edge cases.

**Usage Guidelines:**
- Invoke this skill whenever a code review or feedback on implementation quality is requested.
- Prioritize simplicity and surgicality above all else.
