## ADDED Requirements

### Requirement: AboutPage schema on Historie and Vereinsportrait pages
Historie and Vereinsportrait pages SHALL include valid schema.org AboutPage JSON-LD.

#### Scenario: AboutPage schema rendered correctly
- **WHEN** the historie.astro or vereinsportrait.astro page is built
- **THEN** output includes valid JSON-LD with @type: AboutPage, name, description, and organization reference

### Requirement: Organization association
The AboutPage schema SHALL reference the parent Organization.

#### Scenario: About page links to Organization
- **WHEN** schema is generated for history/portrait pages
- **THEN** contains reference to SV Eutingen Organization