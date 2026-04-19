## Context

The SV Eutingen website uses the `astro-seo` component (migrated from `@astrolib/seo`) for SEO metadata. The component supports Twitter Cards, JSON-LD via `extend`, and richer Open Graph options that are not yet utilized. The `MetaTags.astro` component currently only passes basic SEO props.

## Goals / Non-Goals

**Goals:**

- Add Twitter Card meta tags (`summary_large_image` card type) for richer social previews on X/Twitter (using existing `title` and `description` props)
- Add JSON-LD structured data for Organization schema using the `extend` prop
- Extend the `MetaSEO` interface with optional `structuredData` prop for custom JSON-LD
- Set Open Graph image alt text to suppress astro-seo warnings
- Add per-page schema.org structured data for key pages:
  - Homepage: `WebSite` schema with search `potentialAction`
  - `gaststaette.astro`: `Restaurant` schema
  - `kunstrasen.astro`: `SportsActivityLocation` schema
  - `teamsport.astro`: `SportsTeam` schema (enhanced with nested team listings)
  - `vereinsportrait.astro` and `historie.astro`: `AboutPage` schema
  - `termine.astro`: `CollectionPage` schema (or Event series)
  - `kontakt.astro`: `ContactPage` schema with `PostalAddress` and detailed `contactPoint` array
- **Enhanced schema opportunities** for additional pages:
  - `mitgliedschaft.astro`: `Offer` schemas for membership tiers (wrapped in `Service`)
  - `partnerschaft.astro`: `Service` schema for sponsorship opportunities
  - `newsletter.astro`: `SubscribeAction` schema for email signup
  - `index.astro`: `BlogPosting` schemas for news items in `mainEntity`

**Non-Goals:**

- Per-page Twitter handles or custom card types (use defaults site-wide)
- Complex structured data schemas beyond the listed page types (e.g., BreadcrumbList, FAQPage) — can be future follow-up
- Server-side rendering changes beyond the `<SEO>` and page components

## Decisions

**Use `twitter` prop on `<SEO>` for Twitter Cards**

- Rationale: astro-seo has built-in Twitter Card support — no custom implementation needed
- Config: `card: 'summary_large_image'`, use `title` and `description` from props (no separate twitterTitle/twitterDescription needed)
- Twitter `site` and `creator` handles are not set (club has no official X account)
- Image: use same image as Open Graph; image alt from `title`

**Use `extend` prop for JSON-LD Organization schema**

- Rationale: astro-seo's `extend.meta` prop can inject `<script type="application/ld+json">` tags
- Schema: Basic Organization type with name, URL, and optional logo (built from `SITE.name`, site URL, and `SITE.defaultImage`)
- Alternative: Separate `<script>` tag in layout — rejected for consistency (all SEO in one component)

**Add `structuredData` prop to MetaSEO for custom JSON-LD**

- Rationale: Per-page custom structured data (e.g., WebSite, Restaurant, etc.) may be needed; prop allows passing raw JSON string
- Type: string (JSON-encoded)
- Rendering: When `structuredData` is provided, it's merged with default Organization schema via `extend.meta`

**Per-page schemas via `structuredData` prop**

- Each target page will define its structured data object(s) and serialize to a single JSON string
- For pages with a single schema: `structuredData: JSON.stringify({ "@context": "https://schema.org", "@type": "...", ... })`
- For pages with multiple schemas (e.g., index.astro with WebSite + BlogPostings): `structuredData: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema1, schema2, ...] })`
- The page passes `structuredData` in the `meta` prop to MetaTags, which renders it via `extend.meta`
- `MetaTags.astro` will NOT attempt to merge or modify the structured data; it simply outputs the provided JSON-LD
- Schemas may include `@id` to link entities across pages (e.g., Organization `@id` referenced from ContactPage or SportsTeam)

**Service + Offer pattern**

- For pages selling membership tiers or sponsorship packages, use a Service schema with nested `offers` array
- Each Offer represents one pricing tier; `Service` represents the overall product (membership, sponsorship)
- This pattern matches schema.org's e-commerce expectations and enables rich results for product-like offerings

**Nested SportsTeam member pattern**

- SportsTeam schema can include a `member` array of sub-entities (either individual players or sub-teams)
- For teamsport page, we'll use nested SportsTeam entities for categories (Jugend, Aktive, Volleyball) with their own `member` arrays for individual teams
- Avoid excessive nesting depth; schema.org recommends depth ≤ 5; our structure stays within 2-3 levels

**BlogPosting aggregation**

- BlogPostings on homepage will be aggregated in the WebSite schema's `mainEntity` or `hasPart` property
- `mainEntity` is appropriate for primary content of the page; `hasPart` indicates constituent parts
- We'll use `mainEntity` array containing BlogPosting objects alongside other main entities if needed

**Newsletter SubscribeAction placement**

- SubscribeAction can either be a top-level schema on newsletter.astro OR included as a `potentialAction` in the site-wide WebSite schema
- We'll implement both: standalone on newsletter.astro, and also add to WebSite to surface in search results across the site

**Pass image alt to Open Graph via `openGraph.image.alt`**

- Rationale: astro-seo warns when `openGraph.basic.image` is set without `alt`
- Use the page `title` prop as the alt text (consistent with semantic meaning and current behavior)

## Risks / Trade-offs

- Adding multiple per-page schemas increases maintenance overhead — each new page type requires schema design and implementation
- Risk of duplicate or conflicting schemas (Organization + page-specific) — mitigated by proper design (Organization remains global, page-specific adds new types)
- Schema.org types must be chosen carefully to match page content — incorrect types can hurt SEO rather than help
- Some pages (like `termine.astro`) may benefit from more specific Event series schemas but will use CollectionPage as pragmatic choice
- JSON-LD injection via `structuredData` prop means page developers must craft valid JSON — could add runtime validation but out of scope for now
- Multiple schemas on a single page (e.g., WebSite + BlogPostings) require careful JSON array construction to avoid invalid JSON-LD
- Nested `member` arrays in SportsTeam could become deeply nested — monitor depth to stay within schema.org limits (recommended ≤ 5 levels)
- News items use markdown frontmatter with dates in `YYYY-MM-DD` format; must convert to ISO 8601 with time component (start of day UTC)
- BlogPostings lack dedicated article URLs (point to homepage anchor) — may limit rich result eligibility but still provides semantic value
- Offer `priceValidUntil` requires a date; membership prices likely annual but exact renewal date unknown — optionally omit or set to approximate end-of-season
- ContactPoint array size: dozens of team contacts could create large JSON payload; test performance impact
- `SubscribeAction` on newsletter page is not a typical rich result type but still improves semantic understanding; placement in WebSite potentialAction increases visibility
