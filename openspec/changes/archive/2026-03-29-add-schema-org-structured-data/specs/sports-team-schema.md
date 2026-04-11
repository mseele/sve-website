## ADDED Requirements

### Requirement: SportsTeam schema on Teamsport page
The Teamsport page SHALL include valid schema.org SportsTeam JSON-LD for team information.

#### Scenario: Sports team schema rendered correctly
- **WHEN** the teamsport.astro page is built
- **THEN** output includes valid JSON-LD with @type: SportsTeam, name, sport type, and organization

### Requirement: Team category information
The sports team schema SHALL include sport type and team category for each team group.

#### Scenario: Team schema includes category data
- **WHEN** schema is generated for Teamsport page
- **THEN** contains sport type and team information