## Context

The SV Eutingen website is an Astro 6.0.8 static site using TypeScript, Tailwind CSS v4, and Contentful CMS. It already uses `oxfmt` (v0.42.0) for formatting via `.oxfmtrc.json`. The OXC ecosystem provides both `oxfmt` (formatter) and `oxlint` (linter), making `oxlint` a natural fit — same toolchain, fast Rust-based performance, and compatible configuration philosophy.

Currently there is no linter. The project has 12 TypeScript/JavaScript files and 55 Astro files in `src/`. A baseline `oxlint` scan found 8 issues (7 warnings, 1 parse error in an Astro template).

## Goals / Non-Goals

**Goals:**
- Add `oxlint` as a dev dependency and configure it for the Astro + TypeScript stack
- Provide a `bun run lint` command for running lint checks
- Fix all existing lint violations without changing application logic
- Ensure lint configuration complements the existing `oxfmt` formatter (no rule conflicts)

**Non-Goals:**
- Adding linting to CI/CD pipeline (can be a follow-up)
- Creating a pre-commit hook for linting
- Fixing TypeScript type warnings from `bun run check` (separate concern)
- Linting non-`src/` files (config files, scripts, etc.)

## Decisions

**Use `.oxlintrc.json` at project root**
- Rationale: Standard OXC config location, consistent with `.oxfmtrc.json` pattern
- Alternative: Inline config in `package.json` — rejected for consistency with existing config approach

**Enable `react`, `jsx-a11y`, and `import` plugins**
- Rationale: Astro components use JSX-like syntax (`react` plugin); accessibility checks are valuable for a public website (`jsx-a11y` plugin); ESM import validation catches common module issues (`import` plugin)
- `typescript`, `unicorn`, and `oxc` plugins are already enabled by default

**Add `lint` as a separate script (not combined with `check`)**
- Rationale: `check` handles TypeScript type checking + Astro diagnostics; lint handles code quality. Users should be able to run them independently.
- Alternative: Combined `check:all` script — rejected to preserve existing `check` behavior

**Use `bunx oxlint` in the script rather than requiring global install**
- Rationale: Consistent with how `oxfmt` is invoked; ensures version pinning via `devDependencies`

## Risks / Trade-offs

- **Astro template parse errors**: `oxlint` may not fully parse Astro frontmatter/template syntax. The initial scan found 1 parse error in `mitgliedschaft.astro`. Mitigation: Use `--ignore` patterns or disable specific rules for `.astro` files if needed.
- **Rule conflicts with oxfmt**: Some oxlint rules may overlap with oxfmt formatting. Mitigation: Test that `bun run lint` passes after `bun run format`.
- **False positives in `.astro` files**: Astro's `<script>` tags with `define:vars` create unusual scoping. Mitigation: Suppress specific rules for known Astro patterns rather than broadly disabling rules.
