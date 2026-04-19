## 1. Type Extensions

- [x] 1.1 Add `twitterTitle` and `twitterDescription` optional fields to `MetaSEO` interface in `src/types.ts`
- [x] 1.2 Add `structuredData` optional field (string) to `MetaSEO` interface in `src/types.ts`

## 2. Twitter Card Support

- [x] 2.1 Add `twitter` prop to `<SEO>` with `card: 'summary_large_image'`, using existing `title`, `description`, `image`, and `imageAlt` (from `openGraph.image.alt`)

## 3. Structured Data

- [x] 3.1 Build JSON-LD Organization schema object with `@context`, `@type: 'Organization'`, `name`, `url`
- [x] 3.2 Include `logo` in schema when `SITE.defaultImage` is available
- [x] 3.3 Pass JSON-LD via `extend.meta` prop on `<SEO>` as `<script type="application/ld+json">`
- [x] 3.4 Destructure `structuredData` from props and include custom JSON-LD if provided

## 4. Open Graph Image Alt

- [x] 4.1 Add `image.alt` to the `openGraph` prop using `ogTitle` as alt text

## 5. Verification

- [x] 5.1 Run `bun run build` and confirm build completes without errors
- [x] 5.2 Run `bun run check` and confirm TypeScript/Astro checks pass with no type errors
- [x] 5.3 Render a page and inspect HTML source, confirm `<meta name="twitter:card" content="summary_large_image">` and associated twitter:title, twitter:description, twitter:image tags are present
- [x] 5.4 Render a page and inspect HTML source, confirm `<script type="application/ld+json">` containing `@type: "Organization"` with `name` and `url` properties is present
- [x] 5.5 Run `bun run build` and verify build output contains no warnings from `astro-seo` about missing required props (e.g., image alt)

## 6. Per-Page Twitter Descriptions

_(Already handled: `twitterDescription` falls back to `description`, so all pages get Twitter cards with existing descriptions automatically.)_

## 7. Per-Page Structured Data Schemas

### 7.1 Homepage - WebSite Schema

- [x] 7.1.1 Create WebSite schema with `@context: "https://schema.org"`, `@type: "WebSite"`, `name` from `SITE.name`, `url` from `Astro.site`
- [x] 7.1.2 Add `potentialAction` with `@type: "SearchAction"`, `target` URL template (`{Astro.site}?q={search_term_string}`), and `query-input` required "search-term-string"
- [x] 7.1.3 Pass schema as `structuredData` prop on index.astro meta
- [x] 7.1.4 Verify WebSite schema renders in HTML source with correct `@context` and `potentialAction`

### 7.2 Gaststätte Page - Restaurant Schema

- [x] 7.2.1 Build Restaurant schema with `@type: "Restaurant"`, `name: "Auszeit"` or "Gaststätte Auszeit"
- [x] 7.2.2 Include `description` from meta description, `image` from meta image URL (absolute)
- [x] 7.2.3 Add `address` as `PostalAddress` with `streetAddress: "Marktstraße 84"`, `postalCode: "72184"`, `addressLocality: "Eutingen im Gäu"`, `addressCountry: "DE"`
- [x] 7.2.4 Add `telephone: "+49 7459 1204"` (from impressum)
- [x] 7.2.5 Add `servesCuisine: ["German", "Bavarian"]` (inferred)
- [x] 7.2.6 Optionally add `priceRange: "$$"` and `openingHours` if available (currently not published)
- [x] 7.2.7 Add `menu` URL linking to external restaurant website: "https://www.auszeit-eutingen.de/"
- [x] 7.2.8 Serialize to JSON and pass as `structuredData` prop on gaststaette.astro

### 7.3 Kunstrasen Page - SportsActivityLocation Schema

- [x] 7.3.1 Build SportsActivityLocation schema with `@type: "SportsActivityLocation"`
- [x] 7.3.2 Set `name: "Kunstrasenplatz SV Eutingen"` or similar
- [x] 7.3.3 Use page description for `description`
- [x] 7.3.4 Add `address` (same club address as Restaurant schema)
- [x] 7.3.5 Set `sport: "Soccer"` or `["Soccer"]`
- [x] 7.3.6 Optionally add `telephone` (club contact) and `openingHours: "Available by appointment"`
- [x] 7.3.7 Include `image` from page meta as absolute URL
- [x] 7.3.8 Add `organization` reference to SV Eutingen Organization (`@id` or full object)
- [x] 7.3.9 Pass as `structuredData` on kunstrasen.astro

### 7.4 Teamsport Page - SportsTeam Schema

- [x] 7.4.1 Build SportsTeam schema with `@type: "SportsTeam"`
- [x] 7.4.2 Set `name: "SV Eutingen Teamsport"` or "SV Eutingen Sportteams"
- [x] 7.4.3 Set `sport` as array `["Football", "Volleyball"]`
- [x] 7.4.4 Add `organization` referencing the SV Eutingen Organization
- [x] 7.4.5 Include `memberCount` from total team count (dynamic from `groupedTeams`)
- [x] 7.4.6 Set `description` from page meta or header description
- [x] 7.4.7 Pass as `structuredData` on teamsport.astro
- [x] 7.4.8 Verify schema includes all required properties and renders correctly

### 7.5 About Pages - AboutPage Schema

#### 7.5.1 Vereinsportrait.astro

- [x] Build AboutPage schema with `@type: "AboutPage"`
- [x] Set `name` from meta title ("Vereinsporträt")
- [x] Set `description` from meta description
- [x] Add `about` referencing Organization (SV Eutingen) as `@id` or full object
- [x] Set `url` to page absolute URL
- [x] Pass as `structuredData` on vereinsportrait.astro

#### 7.5.2 Historie.astro

- [x] Build AboutPage schema with `@type: "AboutPage"`
- [x] Set `name` from meta title ("Historie")
- [x] Set `description` from meta description
- [x] Add `about` referencing Organization (SV Eutingen)
- [x] Set `url` to page absolute URL
- [x] Pass as `structuredData` on historie.astro

### 7.6 Termine Page - CollectionPage Schema

- [x] 7.6.1 Build CollectionPage schema with `@type: "CollectionPage"`
- [x] 7.6.2 Set `name: "Termine SV Eutingen"` or from meta title
- [x] 7.6.3 Set `description` from meta description
- [x] 7.6.4 Add `mainEntity` as array of `Event` objects (one per appointment)
- [x] 7.6.5 For each Event from `appointments` data, include:
  - `name` (appointment title)
  - `startDate` in ISO 8601 (need to derive from `start_date` or `start_date_time` backend fields)
  - `endDate` if multi-date events exist (from `end_date`/`end_date_time`)
  - `description` (from appointment description)
  - `url` (from appointment link, if provided)
- [x] 7.6.6 Ensure date formatting uses ISO 8601; may need to extend `getAppointments()` to include raw date fields
- [x] 7.6.7 Pass as `structuredData` on termine.astro

### 7.7 Kontakt Page - ContactPage Schema

- [x] 7.7.1 Build ContactPage schema with `@type: "ContactPage"`
- [x] 7.7.2 Set `name` from meta title ("Kontakt SV Eutingen")
- [x] 7.7.3 Set `description` from meta description
- [x] 7.7.4 Add `address` as PostalAddress (club address: Marktstraße 84, 72184 Eutingen im Gäu, DE)
- [x] 7.7.5 Add `telephone: "+49 7459 1204"` (main contact)
- [x] 7.7.6 Add `email: "info@sv-eutingen.de"`
- [x] 7.7.7 Set `url` to absolute contact page URL
- [x] 7.7.8 Build `contactPoint` array from:
  - Static contacts in `contactCardInputs` (Schutzbeauftragte, Kunstrasen, Fitness, Events, Restaurant, Partnerschaft, Other)
  - Dynamic team contacts from `teams` collection (coach and contact person)
- [x] 7.7.9 For each contact point, create `@type: "ContactPoint"` with:
  - `contactType` (e.g., "Schutzbeauftragte", "Kunstrasen Buchung", "Team contact")
  - `telephone` in E.164 format (e.g., `+49 173 4205370`)
  - `email` address
  - `url` (for WhatsApp: `https://wa.me/...` as `contactOption` or separate method)
- [x] 7.7.10 Pass as `structuredData` on kontakt.astro
- [x] 7.7.11 Verify contactPoint array includes all expected contacts and renders correctly

### 7.8 Validation & Integration

- [x] 7.8.1 Check that each page only renders its own `structuredData` plus global Organization (no duplicates)
- [x] 7.8.2 Verify all schemas include `@context: "https://schema.org"`
- [x] 7.8.3 Run build and check for TypeScript/Astro errors
- [x] 7.8.4 Test each page with Google Rich Results Test
- [x] 7.8.5 Document schema types per page in code comments or README

## 8. Enhanced Schema Opportunities

### 8.1 Teamsport page enhanced SportsTeam schema

- [x] 8.1.1 Extend existing SportsTeam schema on teamsport.astro to include `member` array
- [x] 8.1.2 For each category in `groupedTeams`, create a nested `SportsTeam` entity:
  - `@type: "SportsTeam"`
  - `name` (category name, e.g., "Jugend")
  - `sport` (Football or Volleyball based on category)
  - `description` (category description)
  - `member` array of individual teams (or use `member` for teams; count them)
- [x] 8.1.3 Also include category-level `memberCount` as number of teams in that category
- [x] 8.1.4 Top-level SportsTeam includes `member` array of these category entities
- [x] 8.1.5 Ensure total `memberCount` equals sum of all teams across categories
- [x] 8.1.6 Verify JSON-LD structure is valid and not excessively nested/deep (schema.org limits)

### 8.2 Mitgliedschaft page Offer schema

- [x] 8.2.1 Create a `Service` schema with `@type: "Service"`, `name: "Mitgliedschaft beim SV Eutingen"`
- [x] 8.2.2 Set `provider` as Organization (SV Eutingen)
- [x] 8.2.3 Set `category: "Mitgliedschaft"` or `serviceType: "Vereinsmitgliedschaft"`
- [x] 8.2.4 Add `description` summarizing membership benefits (from page content)
- [x] 8.2.5 Build `offers` array with one `Offer` per membership type from `membershipTypes`:
  - `@type: "Offer"`
  - `name` = membership label (e.g., "Familienbeitrag - beliebig viele Kinder (alle Sparten)")
  - `price` = `price` as string (e.g., "160")
  - `priceCurrency: "EUR"`
  - `availability: "https://schema.org/InStock"`
  - Optionally `priceValidUntil` (if membership prices expire annually, set to end of season)
- [x] 8.2.6 Combine Service and Offers into single JSON-LD; pass as `structuredData`
- [x] 8.2.7 Verify all 6 membership tiers appear in the `offers` array

### 8.3 Partnerschaft page Service schema

- [x] 8.3.1 Create `Service` schema with `@type: "Service"`
- [x] 8.3.2 Set `name: "Sponsoring"` or "Partnerschaft"
- [x] 8.3.3 Set `description` from page meta description or dedicated sponsorship copy
- [x] 8.3.4 Set `provider` as Organization (SV Eutingen)
- [x] 8.3.5 Add `areaServed` as `{"@type": "Country", "name": "DE"}`
- [x] 8.3.6 Set `serviceType: "Sponsorship"` or `category: "Sponsoring"`
- [x] 8.3.7 Optionally add `offers` with price ranges for bandenwerbung or tiered sponsorships (if data available)
- [x] 8.3.8 Optionally add `hasOfferCatalog` referencing an OfferCatalog if multiple sponsorship products
- [x] 8.3.9 Pass as `structuredData` on partnerschaft.astro

### 8.4 Newsletter page SubscribeAction schema

- [x] 8.4.1 Create `SubscribeAction` schema with `@type: "SubscribeAction"`
- [x] 8.4.2 Set `name: "Newsletter abonnieren"`
- [x] 8.4.3 Set `target` to the newsletter page URL (e.g., `${Astro.site}/newsletter`)
- [x] 8.4.4 Add `expectsAcceptanceOf` with URL to privacy policy (`/datenschutz`)
- [x] 8.4.5 Optionally set `agent` as Organization (SV Eutingen)
- [x] 8.4.6 Optionally set `result` as `EmailMessage` or custom type
- [x] 8.4.7 Pass as `structuredData` on newsletter.astro
- [x] 8.4.8 Optionally also add `potentialAction` to site-wide WebSite schema referencing this SubscribeAction

### 8.5 Homepage BlogPosting schema for news items

- [x] 8.5.1 Read news data from `src/data/news/*.md` files (frontmatter: date, title, imageLight, imageDark)
- [x] 8.5.2 Extract content body to generate description excerpt (first ~200 characters)
- [x] 8.5.3 For each news item (limit to latest 5), create `BlogPosting` schema:
  - `@type: "BlogPosting"`
  - `headline` = title
  - `datePublished` = frontmatter date formatted as ISO 8601 (e.g., `"2025-06-15T00:00:00Z"`)
  - `image` = `{"@type": "ImageObject", "url": absolute URL}` (use imageLight or fallback to SITE.defaultImage)
  - `description` = excerpt (truncated, plain text, no markdown)
  - `author` = `{"@type": "Organization", "name": "SV Eutingen 1947 e.V."}`
  - `publisher` = same as author, optionally with `logo`
  - `url` = homepage URL with anchor `#aktuelles` or dedicated news article URL if available
  - `inLanguage: "de-DE"`
- [x] 8.5.4 Aggregate BlogPostings into `mainEntity` array
- [x] 8.5.5 Merge with existing WebSite schema (either extend WebSite with `hasPart` or output separate JSON-LD scripts)
- [x] 8.5.6 Build combined `structuredData` (WebSite + BlogPostings) on index.astro; ensure valid JSON array or multi-script approach
- [x] 8.5.7 Verify news items render correctly with ISO dates and absolute image URLs

## 9. Final Verification

- [x] 9.1 Run `bun run build`; confirm all pages build without errors
- [x] 9.2 Run `bun run check`; TypeScript/Astro checks pass
- [x] 9.3 Inspect HTML source of each modified page; confirm JSON-LD scripts present with correct structure
- [x] 9.4 Test all new schemas with Google Rich Results Test (BlogPosting, Offer, Service, SubscribeAction, enhanced SportsTeam)
- [x] 9.5 Validate JSON-LD syntax; ensure no duplicate `@id` or conflicting contexts
- [x] 9.6 Verify image URLs are absolute (include protocol and domain)
- [x] 9.7 Confirm date fields use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
- [x] 9.8 Document each page's schema types and properties in code comments near `structuredData` assignments
