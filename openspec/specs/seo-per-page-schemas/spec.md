## ADDED Requirements

### Requirement: Homepage WebSite schema

The `index.astro` page SHALL include a WebSite structured data object with search `potentialAction`.

#### Scenario: WebSite schema rendered

- **WHEN** the homepage is rendered
- **THEN** the system includes a JSON-LD script with `@type: "WebSite"`
- **AND** includes `name` from `SITE.name`
- **AND** includes `url` from the site base URL
- **AND** includes `potentialAction` of type `SearchAction`
- **AND** `potentialAction.target` contains a URL template with `{search_term_string}`
- **AND** `potentialAction.query-input` specifies `required` name "search-term-string"

### Requirement: Gaststätte page Restaurant schema

The `gaststaette.astro` page SHALL include a Restaurant structured data object.

#### Scenario: Restaurant schema rendered

- **WHEN** the Gaststätte page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "Restaurant"`
- **AND** includes `name` (e.g., "Auszeit" or "Gaststätte Auszeit")
- **AND** includes `description` from the page meta description
- **AND** includes `address` with the club's address (PostalAddress)
- **AND** includes `telephone` if available (e.g., "07459 1204")
- **AND** includes `image` with the page's Open Graph image
- **AND** includes `servesCuisine` (e.g., "German", "Bavarian")
- **AND** optionally includes `openingHours` if published
- **AND** optionally includes `priceRange` (e.g., "$$")
- **AND** optionally includes `menu` URL linking to external restaurant website

### Requirement: Kunstrasen page SportsActivityLocation schema

The `kunstrasen.astro` page SHALL include a SportsActivityLocation structured data object.

#### Scenario: SportsActivityLocation schema rendered

- **WHEN** the Kunstrasen page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "SportsActivityLocation"`
- **AND** includes `name` (e.g., "Kunstrasenplatz SV Eutingen")
- **AND** includes `description` summarizing the facility
- **AND** includes `address` with the club address
- **AND** includes `sport` (e.g., "Soccer")
- **AND** optionally includes `telephone` contact number
- **AND** optionally includes `openingHours` (e.g., "Available by appointment")
- **AND** includes `image` with the page's main image

### Requirement: Teamsport page SportsTeam schema

The `teamsport.astro` page SHALL include a SportsTeam structured data object representing the club's team sports offerings.

#### Scenario: SportsTeam schema rendered

- **WHEN** the Teamsport page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "SportsTeam"`
- **AND** includes `name` (e.g., "SV Eutingen Teamsport")
- **AND** includes `sport` as an array (e.g., ["Football", "Volleyball"])
- **AND** includes `organization` referencing the SV Eutingen Organization
- **AND** optionally includes `memberCount` if available
- **AND** optionally includes `description` summarizing the team offerings

### Requirement: About pages AboutPage schema

The `vereinsportrait.astro` and `historie.astro` pages SHALL each include an AboutPage structured data object.

#### Scenario: AboutPage schema rendered

- **WHEN** an About page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "AboutPage"`
- **AND** includes `name` from page meta title
- **AND** includes `description` from page meta description
- **AND** includes `about` referencing the Organization (SV Eutingen)
- **AND** includes `url` of the page

### Requirement: Termine page CollectionPage schema

The `termine.astro` page SHALL include a CollectionPage structured data object listing appointments as Events.

#### Scenario: CollectionPage schema rendered

- **WHEN** the Termine page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "CollectionPage"`
- **AND** includes `name` (e.g., "Termine SV Eutingen")
- **AND** includes `description` summarizing the events/appointments
- **AND** includes `mainEntity` as an array of `Event` objects (one per appointment)
- **AND** each Event includes `name`, `startDate` (combined date+time in ISO 8601), and optionally `description` and `url` to details

### Requirement: Kontakt page ContactPage schema

The `kontakt.astro` page SHALL include a ContactPage structured data object with contact details.

#### Scenario: ContactPage schema rendered

- **WHEN** the Kontakt page is rendered
- **THEN** the system includes a JSON-LD script with `@type: "ContactPage"`
- **AND** includes `name` (e.g., "Kontakt SV Eutingen")
- **AND** includes `description` from meta description
- **AND** includes `address` with the club's PostalAddress (street, postalCode, city, country="DE")
- **AND** includes `telephone` if published (main contact: "+49 7459 1204")
- **AND** includes `email` (e.g., "info@sv-eutingen.de")
- **AND** includes `url` of the contact page
- **AND** optionally includes `contactPoint` array with specific contacts including:
  - Team coaches/contacts (from teams collection) with telephone, email, and `contactType` (e.g., "Team contact")
  - Special contacts (Schutzbeauftragte, Kunstrasen, Fitness, Events, Restaurant, Partnerschaft) each as separate contact points with appropriate `contactType` and contact methods (telephone, email, WhatsApp)
- **AND** each `contactPoint` includes `telephone` (if available), `email`, `contactType`, and optionally `alternateName` for display

#### Scenario: ContactPoint data source

- **WHEN** the Kontakt page is built
- **THEN** the contactPoint array aggregates from:
  - Static contact card definitions in `contactCardInputs` (protection officer, facilities, etc.)
  - Dynamic team contacts from the teams collection (coach and contact person data)
- **AND** each contact point follows schema.org `ContactPoint` type with `@type: "ContactPoint"`

### Requirement: MetaTags component renders custom structured data

The `MetaTags.astro` component SHALL render any provided `structuredData` in addition to the default Organization schema.

#### Scenario: Custom structured data passed

- **WHEN** a page provides `structuredData` prop (a JSON string) to MetaTags
- **THEN** MetaTags includes that JSON-LD script in the page head
- **AND** the script has `type="application/ld+json"`
- **AND** the content is exactly the serialized `structuredData` string

#### Scenario: No custom structured data

- **WHEN** no `structuredData` prop is provided
- **THEN** MetaTags renders only the default Organization schema

#### Scenario: Invalid JSON in structuredData

- **WHEN** `structuredData` prop contains invalid JSON
- **THEN** MetaTags logs a warning during rendering
- **AND** still renders the default Organization schema (does not break the page)
