## ADDED Requirements

### Requirement: Collection schema on Termine page

The Termine/Appointments page SHALL include valid schema.org CollectionPage JSON-LD with event listings.

#### Scenario: Collection schema rendered correctly

- **WHEN** the termine.astro page is built
- **THEN** output includes valid JSON-LD with @type: CollectionPage or Event type referencing appointments

### Requirement: Event aggregation

The collection schema SHALL aggregate scheduled events from the appointments system.

#### Scenario: Events schema with collection

- **WHEN** schema is generated for Termine page
- **THEN** includes information about events/appointments available
