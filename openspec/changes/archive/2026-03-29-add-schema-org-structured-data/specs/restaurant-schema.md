## ADDED Requirements

### Requirement: Restaurant schema on Gaststätte page

The Gaststätte page SHALL include valid schema.org Restaurant JSON-LD for Google Rich Results featuring dining information.

#### Scenario: Restaurant schema rendered correctly

- **WHEN** the gaststaette.astro page is built
- **THEN** output includes valid JSON-LD with @type: Restaurant, name, address, and openingHours

### Requirement: Opening hours specification

The restaurant schema SHALL include openingHours in schema.org format.

#### Scenario: Opening hours rendered

- **WHEN** schema is generated for Gaststätte page
- **THEN** openingHours field is present in the JSON-LD structure
