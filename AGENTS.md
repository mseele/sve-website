# AGENTS.md - Coding Guidelines for SV Eutingen Website

Astro-based static website for SV Eutingen 1947 e.V. Uses TypeScript, Tailwind CSS v4, and Contentful CMS. No test suite.

## Build Commands

- `bun run dev` — development server
- `bun run build` — production build
- `bun run check` — TypeScript + Astro check
- `bun run format` — format with `oxfmt`
- `bun install` — install dependencies

## Code Style

- **Formatter**: `oxfmt` via `bun run format`. Semicolons: false. Single quotes: true. Tab width: 2. Print width: 100. Trailing commas: all.
- **Imports**: Use `@/` alias for `src/` imports. Group: external libs → `@/` aliases → relative. Use explicit extensions for Astro components.
- **TypeScript**: Strict mode. Explicit types for parameters and returns. `interface` for objects, `type` for unions/aliases. Export types from `src/types.ts`. Use Zod for runtime validation.
- **Naming**: PascalCase components (`HeroSection.astro`), camelCase TS files and variables, PascalCase Astro files, `UPPER_SNAKE_CASE` or camelCase constants, `Props` for component prop interfaces.
- **Astro components**: Frontmatter script for server-side code, `<script>` tags at the bottom, destructure `Astro.props`, type props with `interface Props`, use Astro `Picture`/`Image` for images.
- **Tailwind**: v4 syntax, `dark:` prefix, custom colors `primary`/`darker`/`primaryLight`, use `Prose` for typography.
- **Error handling**: Early returns, Zod validation, optional chaining for nullish values, descriptive errors for unexpected states.

## Project Structure

```
src/
├── api/           # API clients (Contentful, backend)
├── client/        # Browser-side JavaScript
├── components/
│   ├── blocks/    # Page section components
│   ├── common/    # Shared UI components
│   └── controls/  # Form inputs/buttons
├── layouts/       # Astro layouts
├── pages/         # Route pages
├── assets/        # Images, fonts
├── types.ts       # TypeScript definitions
├── utils.ts       # Helper functions
└── config.mjs     # Site configuration
```

## Key Patterns

- Images: `ThemedImage` interface for light/dark variants.
- Forms: validation utilities in `src/client/forms.ts`.
- Dates: `date-fns` with German locale.
- Currency: `Intl.NumberFormat` with `'de-DE'`.
- Icons: `astro-icon` with `@iconify-json/mdi`.

## Environment Variables

Access via `import.meta.env.*`:

- Client: `BACKEND_API`, `CAPTCHA_SITE_KEY`, `PREVIEW`, `ROLLBAR_ACCESS_TOKEN` (optional), `GIT_SHA` (optional, set by the build)
- Server: `CONTENTFUL_*` tokens, `SUBDOMAIN`
- Build-only (Netlify, not exposed to the client): `ROLLBAR_POST_SERVER_ITEM_TOKEN` — used by `scripts/upload-sourcemaps.ts` to upload source maps to Rollbar.

## Git

- Always use conventional commits: `type(scope): summary`, type one of `feat fix chore refactor perf test docs style build ci`. Summary: imperative, ≤ 72 chars, no period.
- Body states what changed and why in short plain sentences. No filler or bloat.
- Commit closes an issue/ticket → end the body with `closes #<issue>`.
- One logical change per commit. Lint/format before committing, push the branch afterwards.

## Agent Skills

- **Issue tracker**: GitHub issues in `mseele/sve-website`; external PRs are not triage items. See `docs/agents/issue-tracker.md`.
- **Triage labels**: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.
- **Domain docs**: single-context repo; read `CONTEXT.md` and `docs/adr/` at the root. See `docs/agents/domain.md`.
