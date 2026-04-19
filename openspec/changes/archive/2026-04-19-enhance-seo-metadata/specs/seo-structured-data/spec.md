## ADDED Requirements

### Requirement: JSON-LD Organization structured data

The MetaTags component SHALL render a JSON-LD `<script>` tag with Organization schema using the `extend` prop on `<SEO>`.

#### Scenario: Organization schema rendered

- **WHEN** a page is rendered
- **THEN** the system renders a `<script type="application/ld+json">` tag containing `@type: "Organization"`
- **AND** the schema includes `name` from `SITE.name`
- **AND** the schema includes `url` from the site's base URL

#### Scenario: Logo included when available

- **WHEN** the site configuration provides a default image
- **THEN** the Organization schema includes a `logo` property pointing to the site's default image URL

### Requirement: Custom structured data via MetaSEO

The `MetaSEO` interface SHALL include an optional `structuredData` field for per-page JSON-LD customization.

#### Scenario: Page-specific structured data

- **WHEN** a page provides a `structuredData` prop (JSON string) to MetaTags
- **THEN** the system renders that JSON-LD in addition to the default Organization schema
- **AND** the JSON-LD may be either a single schema object or a `@graph` container with multiple schemas

#### Scenario: No structured data override

- **WHEN** no `structuredData` prop is provided
- **THEN** the system renders only the default Organization schema

#### Scenario: Missing site configuration

- **WHEN** `SITE.name` is not configured
- **THEN** the Organization schema either omits `name` or uses a fallback value

- **WHEN** no default image is configured
- **THEN** the Organization schema does NOT include a `logo` property

#### Scenario: Invalid custom structured data

- **WHEN** a page provides invalid JSON in the `structuredData` prop
- **THEN** the system logs a warning and renders only the default Organization schema (or throws a descriptive error)
