## Why

The current SEO solution uses `@astrolib/seo` (v1.0.0-beta.8), an unmaintained library with critical bugs including a broken canonical URL feature. The library has 10 open issues, no stable releases, and hasn't been updated in over a year. The project explicitly notes a workaround for the canonical bug with a TODO to "move back to AstroSeo when issue #19 is fixed" - that fix has not materialized.

A better alternative exists: `astro-seo` (v1.1.0, published Jan 2026) with 1.3k stars, 62k weekly downloads, 28 contributors, and only 2 open issues. It's actively maintained, feature-complete, and specifically designed for Astro.

## What Changes

- Replace `@astrolib/seo` with `astro-seo` in package.json
- Update `MetaTags.astro` component:
  - Change import from `@astrolib/seo` to `astro-seo` (component name: `SEO`)
  - Remove manual canonical link (astro-seo handles it correctly)
  - Adapt `openGraph` prop structure to nested `.basic` and `.optional` format
  - Remove custom image URL conversion (astro-seo accepts string URLs directly)
  - Update charset handling (astro-seo includes default UTF-8)
- Remove TODO comment about canonical bug

## Capabilities

### New Capabilities

- `seo-metadata-generation`: Centralized SEO metadata management using the `astro-seo` component library

## Impact

- **Files**: `src/components/common/MetaTags.astro`, `package.json`
- **Dependencies**: `@astrolib/seo` removed, `astro-seo` added
- **No breaking changes** to external APIs - MetaTags props interface remains identical
- **Other pages**: All pages using MetaTags through Layout automatically benefit
