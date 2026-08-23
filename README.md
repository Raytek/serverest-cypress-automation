# ServeRest Cypress Test Automation

Automated testing project built on top of [ServeRest](https://github.com/ServeRest/ServeRest) using Cypress and JavaScript.

## Test Strategy

The test scope, selected scenarios, and automation strategy are documented in the [Test Plan](./TEST_PLAN.md).

## Project Structure

```text
cypress/
├── api/                 # API tests
├── e2e/                 # UI tests
├── fixtures/            # Static test data
└── support/
    ├── components/      # Shared UI components
    ├── factories/       # Dynamic test data
    ├── pages/           # Page Objects
    ├── services/        # API interactions
    └── commands.js      # Custom Cypress commands
```

## Design Decisions

- **Isolated test data:** Test data is generated dynamically using UUIDs and a dedicated naming prefix. This avoids collisions between executions and allows test-created data to be safely identified and removed during cleanup.

- **API-driven E2E setup:** Authentication and data preconditions are handled through the API whenever they are not the behavior under test. This keeps UI scenarios focused, faster, and less dependent on unrelated application flows.

- **Page and Component Objects:** Page-specific interactions are encapsulated in Page Objects, while shared UI elements, such as the navigation bar, are represented as Component Objects. This keeps selectors and UI implementation details out of the test scenarios.

## Running the Tests

Install the project dependencies:

```bash
npm ci
```

Run the complete test suite:

```bash
npm test
```

API and E2E tests can also be executed independently:

```bash
npm run test:api
npm run test:e2e
```

For interactive execution using the Cypress Test Runner:

```bash
npm run test:open
```

## Report Generation

Reports are generated separately from test execution, allowing reports to be created even when tests fail.

Clean artifacts from previous local executions:

```bash
npm run report:clean
```

Run the tests and generate the consolidated Mochawesome report:

```bash
npm test
npm run report
```

The generated report is available at `cypress/reports/index.html`.

The latest successful CI report is also published on [GitHub Pages](https://raytek.github.io/serverest-cypress-automation/).

## Continuous Integration

GitHub Actions runs linting and the complete test suite on pushes and pull requests targeting `main`, with support for manual execution.