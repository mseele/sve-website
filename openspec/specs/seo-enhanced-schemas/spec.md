## ADDED Requirements

### Requirement: Teamsport enhanced SportsTeam schema with nested teams

The `teamsport.astro` page SHALL include an enhanced SportsTeam schema that lists all team categories and their teams as nested entities.

#### Scenario: Enhanced SportsTeam schema with member teams

- **WHEN** the Teamsport page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "SportsTeam"` representing the overall club team sports
- **AND** includes `name` (e.g., "SV Eutingen Teamsport")
- **AND** includes `sport` as array ["Football", "Volleyball"]
- **AND** includes `member` array containing sub-entities:
  - Each team category (e.g., "Jugend", "Aktive", "Volleyball") as a `SportsTeam` with its own `name`, `sport`, `description`
  - Each category includes an array of individual teams with `name` and `league` ( Spielklasse)
- **AND** includes `memberCount` equal to total number of teams
- **AND** includes `organization` referencing the SV Eutingen Organization

#### Scenario: Team data source

- **WHEN** the Teamsport page is built
- **THEN** the `member` array is constructed from `groupedTeams` data
- **AND** each category group becomes a nested SportsTeam entity
- **AND** individual teams are included as `member` of their category or as a separate array property (e.g., `teams`)

### Requirement: Mitgliedschaft page Offer schemas

The `mitgliedschaft.astro` page SHALL include Offer schemas for each membership tier, wrapped in a Service or Product representing club membership.

#### Scenario: Offer schemas rendered

- **WHEN** the Mitgliedschaft page is rendered
- **THEN** the system includes JSON-LD with at least one of the following patterns:
  1. A `Service` with `@type: "Service"`, `name: "Mitgliedschaft"`, and an `offers` array containing multiple `Offer` entries
  2. Individual `Offer` entities for each membership type, all referencing the same `Service`
- **AND** each Offer includes:
  - `@type: "Offer"`
  - `name` matching the membership type label (e.g., "Familienbeitrag - beliebig viele Kinder (alle Sparten)")
  - `price` as string (e.g., "160")
  - `priceCurrency: "EUR"`
  - `availability: "https://schema.org/InStock"`
  - `priceValidUntil` (optional, if membership prices have expiration)
- **AND** the Service includes:
  - `provider` referencing the Organization (SV Eutingen)
  - `category: "Mitgliedschaft"` or `serviceType: "Vereinsmitgliedschaft"`
  - `description` summarizing membership benefits

#### Scenario: Membership data source

- **WHEN** the page is built
- **THEN** the membership data is sourced from the `membershipTypes` array defined in the page frontmatter
- **AND** each membership type's `price` and `label` are used in the Offer

### Requirement: Partnerschaft page Service schema

The `partnerschaft.astro` page SHALL include a Service schema describing sponsorship and partnership opportunities.

#### Scenario: Service schema rendered

- **WHEN** the Partnerschaft page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "Service"`
- **AND** includes `name` (e.g., "Sponsoring" or "Partnerschaft")
- **AND** includes `description` summarizing partnership benefits (from page meta or dedicated section)
- **AND** includes `provider` with `@type: "Organization"` referencing SV Eutingen
- **AND** includes `areaServed` with `@type: "Country"` and `name: "DE"`
- **AND** includes `serviceType` or `category` indicating "Sponsorship" or "Partnerschaft"
- **AND** optionally includes `offers` with pricing information for bandenwerbung or other sponsorship tiers
- **AND** optionally includes `hasOfferCatalog` if multiple sponsorship products are available

### Requirement: Newsletter page SubscribeAction schema

The `newsletter.astro` page SHALL include a SubscribeAction schema to enable email signup rich results.

#### Scenario: SubscribeAction schema rendered

- **WHEN** the Newsletter page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "SubscribeAction"`
- **AND** includes `name` (e.g., "Newsletter abonnieren")
- **AND** includes `target` pointing to the current page URL (the signup form location)
- **AND** includes `expectsAcceptanceOf` with URL to the privacy policy (`/datenschutz`)
- **AND** optionally includes `result` of type `EmailMessage` or `Thing`
- **AND** optionally includes `agent` as the Organization (SV Eutingen) if the organization is the actor

#### Scenario: Integration with WebSite

- **WHEN** the site-wide WebSite schema is rendered
- **THEN** it MAY include a `potentialAction` array that includes the SubscribeAction
- **AND** the potentialAction points to the newsletter page as the entry point

### Requirement: Homepage BlogPosting schema for news items

The `index.astro` homepage SHALL include BlogPosting schemas for each news item displayed in the "Aktuelles" section.

#### Scenario: BlogPosting schemas rendered

- **WHEN** the homepage is rendered
- **THEN** the system includes JSON-LD with `@type: "BlogPosting"` for each news item (up to N items, e.g., 3-5 latest)
- **AND** each BlogPosting includes:
  - `@type: "BlogPosting"`
  - `headline` (title from news frontmatter)
  - `datePublished` in ISO 8601 format (from frontmatter `date`)
  - `image` as object with `@type: "ImageObject"`, `url` (absolute URL to imageLight/dark)
  - `description` (excerpt from news content; truncated to ~200 chars)
  - `author` with `@type: "Organization"`, `name: "SV Eutingen 1947 e.V."`
  - `publisher` with `@type: "Organization"`, `name: "SV Eutingen 1947 e.V."`, and `logo` if available
  - `url` linking to the full news article (if individual news pages exist, otherwise homepage #aktuelles anchor)
  - `inLanguage: "de-DE"`
- **AND** the BlogPostings are aggregated in a `mainEntity` array within the WebSite schema OR as separate top-level JSON-LD scripts
- **AND** the WebSite schema (if used) includes `hasPart` or `mainEntity` referencing the BlogPostings

#### Scenario: News data source

- **WHEN** the page is built
- **THEN** the news items are sourced from the frontmatter of markdown files in `src/data/news/`
- **AND** only published/valid news items are included (sorted by date descending)
- **AND** if no `imageLight`/`imageDark` is available, a default image from SITE.defaultImage is used

#### Scenario: Address missing data

- **WHEN** a news item lacks an explicit description excerpt
- **THEN** the system derives description from the content text (first paragraph or truncation)
- **AND** if content is too short, description may be omitted or fall back to the site meta description
