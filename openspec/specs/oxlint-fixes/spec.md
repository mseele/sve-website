## ADDED Requirements

### Requirement: All lint violations are resolved

All existing oxlint violations in `src/` SHALL be fixed. No warnings or errors SHALL remain after running `bun run lint`.

#### Scenario: Clean lint run

- **WHEN** a developer runs `bun run lint`
- **THEN** oxlint reports zero warnings and zero errors

### Requirement: No logic changes in lint fixes

Lint fixes SHALL only modify code structure or syntax to satisfy lint rules. Application behavior MUST NOT change.

#### Scenario: Functional equivalence

- **WHEN** lint fixes are applied
- **THEN** `bun run check` still passes with the same results as before
- **AND** `bun run build` still succeeds

### Requirement: Astro-specific patterns are handled

Known Astro template patterns that cause false positives (e.g., `define:vars` in `<script>` tags) SHALL be handled via rule suppression or ignore patterns, not by modifying the Astro syntax.

#### Scenario: Astro script with define:vars

- **WHEN** an Astro component uses `<script define:vars={{ ... }}>`
- **THEN** oxlint does not report false positive errors for this pattern
