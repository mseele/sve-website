## Context

The SV Eutingen website is an Astro-based static site for a sports club. Event detail pages already have proper schema.org structured data (Event/SportsEvent types). However, other important pages lack structured data, limiting SEO potential in Google Search results.

**Current State:**
- Event pages have Event/SportsEvent schema with offers, location, organizer
- Organization schema is present site-wide via MetaTags component
- No page-specific schemas beyond events

**Constraints:**
- Astro SSG with static build
- TypeScript with Zod validation
- Existing meta SEO system uses `MetaSEO` type with `structuredData` field
- Must use JSON-LD format for schema markup
- Images are handled via Astro's ImageMetadata type

## Goals / Non-Goals

**Goals:**
- Add schema.org JSON-LD to all main pages for Google Rich Results
- Follow existing pattern: define schema in frontmatter, pass via MetaSEO props
- Use consistent helper functions for common schema patterns
- Ensure all schemas include required properties for rich result eligibility

**Non-Goals:**
- Add FAQPage schema (no FAQ content exists on site)
- Modify API data structures (only frontend presentation)
- Add testing framework (project has no tests per AGENTS.md)

## Decisions

**D1: Schema generation approach**
- Decision: Generate schema inline in each page's frontmatter (same pattern as existing Event pages)
- Alternative considered: Create shared utility functions in src/utils.ts
- Rationale: Each page has unique properties; inline is more maintainable and explicit

**D2: Handling missing page data**
- Decision: Use sensible defaults for missing optional fields
- Example: Opening hours can be minimal or derived from description text
- Rationale: Avoids runtime errors; Google ignores incomplete but valid schemas

**D3: Image handling**
- Decision: Use same pattern as Event pages - convert ImageMetadata to URL string
- Alternative: Add new prop for image-as-string in MetaSEO type
- Rationale: Maintains consistency; conversion is straightforward `${Astro.site}${image.src}`

## Risks / Trade-offs

**[R1] Image type mismatch** → Use string type assertion when passing to schema
- The `MetaSEO.image` is ImageMetadata type but schema needs URL string
- Already handled in Event pages with `${Astro.site}${imageSrc}` pattern

**[R2] Build time vs runtime** → All schemas computed at build time
- No client-side availability for availability data
- Not a concern for static pages - they're accurate at build time

**[R3] Schema validation** → Google Rich Results testing should verify in staging
- All schemas follow schema.org type definitions
- Some optional fields may be missing but shouldn't cause validation errors

## Migration Plan

1. Add schemas to each page one-by-one (minimal risk on each)
2. Build and verify each page at `/dist` 
3. Test with Google Rich Results test tool
4. Deploy to production (build output only, no database changes)

**Rollback:** Remove `structuredData` property from each page's meta object.