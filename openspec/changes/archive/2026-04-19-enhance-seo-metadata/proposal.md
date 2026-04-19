## Why

The recent migration from `@astrolib/seo` to `astro-seo` provides new capabilities (Twitter Cards, JSON-LD via `extend`, richer Open Graph options) that are not yet utilized. Additionally, the site currently lacks per-page schema.org structured data, which limits rich result opportunities in search engines. Enhancing SEO metadata will improve social sharing appearance, search engine visibility, and enable rich snippets.

## What Changes

- Add Twitter Card meta tags for richer social previews on X/Twitter (using existing `title` and `description` props)
- Add JSON-LD structured data for Organization via the `extend` prop (global, on all pages)
- Extend `MetaSEO` interface with optional `structuredData` field for custom JSON-LD
- Ensure Open Graph image alt text is always set (suppress astro-seo warning)
- **Add per-page schema.org structured data for key pages:**
  - Homepage: `WebSite` schema with search `potentialAction`
  - `gaststaette.astro`: `Restaurant` schema with name, address, and offers
  - `kunstrasen.astro`: `SportsActivityLocation` schema with facility details
  - `teamsport.astro`: `SportsTeam` schema with nested team listings (enhanced)
  - `vereinsportrait.astro` and `historie.astro`: `AboutPage` schema with organization reference
  - `termine.astro`: `CollectionPage` schema for event listings
  - `kontakt.astro`: `ContactPage` schema with `PostalAddress` and detailed `contactPoint` array (team contacts, special contacts)
- **Add enhanced schema opportunities for additional pages:**
  - `mitgliedschaft.astro`: `Offer` schemas for each membership tier (Family, AdultActive, AdultPremium, AdultSupporting, Youth, Fitness) wrapped in `Service`
  - `partnerschaft.astro`: `Service` schema for sponsorship/partnership opportunities
  - `newsletter.astro`: `SubscribeAction` schema for email signup
  - `index.astro`: `BlogPosting` schemas for news items in `mainEntity` alongside WebSite schema

## Capabilities

### New Capabilities

- `seo-twitter-cards`: Twitter Card support (`twitter` prop on `<SEO>`)
- `seo-structured-data`: JSON-LD structured data via `extend` prop (global Organization)
- `seo-per-page-schemas`: Page-specific schema.org types via `structuredData` prop in `MetaSEO`

### Modified Capabilities

_(none — no existing specs to modify)_

## Impact

- `src/components/common/MetaTags.astro` — pass `twitter` and `extend` props, render custom `structuredData` if provided
- `src/types.ts` — add optional `structuredData` field to `MetaSEO` interface
- Individual pages (`src/pages/*.astro`) — add page-specific structured data objects and pass via `meta.structuredData`
- No new dependencies (all supported by `astro-seo`)
