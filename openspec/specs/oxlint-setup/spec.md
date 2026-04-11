## ADDED Requirements

### Requirement: oxlint is installed as a dev dependency

The project SHALL have `oxlint` listed in `devDependencies` in `package.json`.

#### Scenario: oxlint is available via bunx

- **WHEN** a developer runs `bunx oxlint --version`
- **THEN** the command succeeds and prints the oxlint version

### Requirement: oxlint configuration file exists

A `.oxlintrc.json` file SHALL exist at the project root with appropriate rules for the Astro + TypeScript stack.

#### Scenario: Config file is valid JSON

- **WHEN** a developer reads `.oxlintrc.json`
- **THEN** it contains valid JSON with plugins enabled (react, jsx-a11y, import) and rule configuration

### Requirement: lint npm script is available

A `lint` script SHALL be available in `package.json` that runs oxlint against `src/`.

#### Scenario: Running lint script

- **WHEN** a developer runs `bun run lint`
- **THEN** oxlint scans all TypeScript and Astro files in `src/` and reports results
