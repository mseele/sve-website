## Why

Adding schema.org structured data (JSON-LD) to all pages improves SEO visibility through Google Rich Results and enhances how search engines understand the website content. The SV Eutingen website already has structured data for event pages but misses significant opportunities on other key pages.

## What Changes

- Add `Restaurant` schema to Gaststätte page with opening hours
- Add `SportsActivityLocation` schema to Kunstrasen rental page
- Add `SportsTeam` schema to Teamsport page
- Add `AboutPage` schema to Historie and Vereinsportrait pages
- Add `WebSite` schema to Homepage with search action
- Add `Event` collection schema to Termine/Appointments page
- Add `PostalAddress` to Kontakt page for local SEO

## Capabilities

### New Capabilities

- `page-schema`: Schema markup system for different page types
- `restaurant-schema`: Restaurant/gaststätte schema with opening hours
- `sports-location-schema`: Sports facility rental schema
- `sports-team-schema`: Sports team and category schema
- `about-page-schema`: About page schema for history/org pages
- `website-schema`: Website with search action for homepage
- `events-collection-schema`: Event collection for appointments calendar
- `contact-page-schema`: Contact page with postal address

### Modified Capabilities

- None - this is a new capability addition

## Impact

**Files Modified:**

- `src/pages/gaststaette.astro`
- `src/pages/kunstrasen.astro`
- `src/pages/teamsport.astro`
- `src/pages/historie.astro`
- `src/pages/vereinsportrait.astro`
- `src/pages/index.astro`
- `src/pages/termine.astro`
- `src/pages/kontakt.astro`

**No Breaking Changes:** This is purely additive SEO improvement.
