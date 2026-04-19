## ADDED Requirements

### Requirement: ContactPage schema with PostalAddress on Kontakt page

The Kontakt page SHALL include valid schema.org ContactPage JSON-LD with PostalAddress for local SEO.

#### Scenario: ContactPage schema rendered correctly

- **WHEN** the kontakt.astro page is built
- **THEN** output includes valid JSON-LD with @type: ContactPage, name, and address with German postal address

### Requirement: Address included in contact page

The contact page schema SHALL include a complete postalAddress with German format.

#### Scenario: Postal address in schema

- **WHEN** schema is generated for Kontakt page
- **THEN** contains streetAddress, addressLocality, postalCode, and addressCountry for Germany
