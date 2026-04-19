## ADDED Requirements

### Requirement: Twitter Card meta tags rendered

The MetaTags component SHALL render Twitter Card meta tags using the `twitter` prop on `<SEO>`.

#### Scenario: Summary large image card rendered

- **WHEN** a page is rendered
- **THEN** the system renders `<meta name="twitter:card" content="summary_large_image" />`
- **AND** `<meta name="twitter:title">` with the value from the `title` prop
- **AND** `<meta name="twitter:description">` with the value from the `description` prop
- **AND** `<meta name="twitter:image">` with the image URL from `openGraph.image`

#### Scenario: Twitter image alt is set

- **WHEN** a page is rendered
- **THEN** `<meta name="twitter:image:alt">` contains the same value as `openGraph.image.alt` (the page title)

#### Scenario: Missing image fallback

- **WHEN** a page has no `openGraph.image` configured
- **THEN** the system either omits `twitter:image` and `twitter:image:alt` or uses a default site image if available
