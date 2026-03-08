# AGENTS.md - Coding Guidelines for SV Eutingen Website

## Project Overview

Astro-based static website for SV Eutingen 1947 e.V. sports club. Uses TypeScript, Tailwind CSS v4, and Contentful CMS.

## Build Commands

```bash
# Development server
bun run dev

# Production build
bun run build

# Type check (TypeScript + Astro)
bun run check

# Format code
bun run format

# Install dependencies
bun install
```

**Note:** No test suite currently exists in this project.

## Code Style

### Formatter
- Use `oxfmt` (not Prettier) - run via `bun run format`
- Config: `.oxfmtrc.json`
- Semicolons: **false**
- Single quotes: **true**
- Tab width: **2 spaces**
- Print width: **100**
- Trailing commas: **all**

### Imports
- Use `@/` alias for all `src/` imports (e.g., `@/components/common/Button`)
- Group imports: external libs → `@/` aliases → relative imports
- Use explicit file extensions for Astro components

### TypeScript
- Strict mode enabled
- Always use explicit types for function parameters and returns
- Use `interface` for object shapes, `type` for unions/aliases
- Export types from `src/types.ts`
- Use Zod for runtime validation (see `src/types.ts` examples)

### Naming Conventions
- Components: PascalCase (e.g., `HeroSection.astro`)
- Files: camelCase for TS, PascalCase for Astro components
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE or camelCase
- Props interfaces: Use `Props` name in component files

### Astro Components
- Use frontmatter script for server-side code
- Client-side scripts in `<script>` tags at bottom
- Use `Astro.props` with destructuring
- Type props with `interface Props`
- Use Astro's built-in components (`Picture`, `Image`) for images

### Tailwind CSS
- Use Tailwind v4 syntax
- Dark mode: use `dark:` prefix
- Custom colors: `primary`, `darker`, `primaryLight`
- Typography: use `@tailwindcss/typography` plugin via `Prose` component

### Error Handling
- Use early returns with guard clauses
- Validate API responses with Zod schemas
- Handle undefined/null with optional chaining (`?.`)
- Throw descriptive errors for unexpected states

### Project Structure
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

### Key Patterns
- Images: Use `ThemedImage` interface for light/dark variants
- Forms: Use validation utilities from `src/client/forms.ts`
- Dates: Use `date-fns` with German locale
- Currency: Use `Intl.NumberFormat` with 'de-DE' locale
- Icons: Use `astro-icon` with `@iconify-json/mdi`

### Environment Variables
Access via `import.meta.env.*`:
- `BACKEND_API`, `CAPTCHA_SITE_KEY`, `PREVIEW` (client)
- `CONTENTFUL_*` tokens, `SUBDOMAIN` (server)

### Git
- No specific commit message format required
- Format code before committing
