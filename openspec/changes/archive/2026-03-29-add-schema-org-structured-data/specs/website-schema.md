## ADDED Requirements

### Requirement: Website schema on Homepage

The Homepage (index.astro) SHALL include valid schema.org WebSite JSON-LD with search action.

#### Scenario: Website schema rendered correctly

- **WHEN** the index.astro page is built
- **THEN** output includes valid JSON-LD with @type: WebSite, name, and potentialAction for search

### Requirement: Search action integration

The website schema SHALL include a searchAction pointing to the site's search functionality.

#### Scenario: Search action present

- **WHEN** schema is generated for Homepage
- **THEN** contains potentialAction with searchUrl pointing to /search
