## Why

The project uses `oxfmt` for formatting but has no linter configured. Adding `oxlint` (from the same OXC ecosystem) provides fast, consistent code quality checks that complement the existing formatter. This catches bugs, unsafe patterns, and style issues before they reach production.

## What Changes

- Add `oxlint` as a dev dependency in `package.json`
- Create an `oxlint` configuration file (`.oxlintrc.json`) with rules appropriate for the Astro + TypeScript stack
- Add a `lint` script to `package.json` for running `oxlint`
- Fix all existing linting errors across `src/` (7 warnings, 1 parse error as of initial scan)
- No logic changes — only structural/syntax fixes to satisfy lint rules

## Capabilities

### New Capabilities

- `oxlint-setup`: Install oxlint, create configuration, and add npm script
- `oxlint-fixes`: Fix all existing lint violations across src/ files

### Modified Capabilities

(none — no existing specs)

## Impact

- **Dependencies**: `oxlint` added to `devDependencies`
- **Config files**: New `.oxlintrc.json` at project root
- **package.json**: New `lint` script added
- **Source files**: Minor fixes in ~3-4 files to resolve lint warnings (unused expressions, unsafe optional chains, triple-slash references)
- **CI/CD**: No changes required unless lint should be added to build pipeline (out of scope)
