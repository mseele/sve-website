## ADDED Requirements

### Requirement: SportsActivityLocation schema on Kunstrasen page

The Kunstrasen rental page SHALL include valid schema.org SportsActivityLocation JSON-LD for Google Rich Results.

#### Scenario: Sports location schema rendered correctly

- **WHEN** the kunstrasen.astro page is built
- **THEN** output includes valid JSON-LD with @type: SportsActivityLocation, name, description, address

### Requirement: Facility rental information

The sports location schema SHALL include priceRange or offer details for rental.

#### Scenario: Facility schema includes rental info

- **WHEN** schema is generated for Kunstrasen page
- **THEN** contains name, description, and location information
