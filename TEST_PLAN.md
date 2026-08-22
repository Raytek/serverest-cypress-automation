# Test Plan

## 1. Objective

This test plan defines the automated testing strategy for the ServeRest Cypress Test Automation project.

The goal is to validate selected product management workflows through both the frontend and API layers, covering successful operations, business rules, input validation, authentication, and authorization.

## 2. Scope

The automation suite contains:

* 3 frontend E2E scenarios using the ServeRest web application.
* 3 API scenarios using the ServeRest REST API.

The scenarios focus on product management from an administrator perspective and the access-control rules that protect product creation operations.

## 3. Test Scenarios

### Frontend

#### FE-001 — Create a product successfully

Validate that an authenticated administrator can create a product using valid required data and that the created product is available after registration.

#### FE-002 — Prevent duplicate product creation

Validate that the application prevents the creation of a product whose name is already registered and that no duplicate product is persisted.

#### FE-003 — Validate required product fields

Validate that the product registration form displays the appropriate validation messages when an administrator attempts to submit it without the required fields.

### API

#### API-001 — Create a product as an administrator

Validate that an authenticated administrator can create a product with valid data and receives the expected successful response.

**Expected status:** `201 Created`

#### API-002 — Reject product creation without authentication

Validate that a product cannot be created when no authentication token is provided.

**Expected status:** `401 Unauthorized`

#### API-003 — Reject product creation without authorization

Validate that an authenticated consumer cannot create products, ensuring that product management operations remain restricted to administrator users.

**Expected status:** `403 Forbidden`

## 4. Test Data Strategy

Static reusable test data is centralized in Cypress fixtures.

Data that must be unique between executions, such as product names and user emails, is generated at runtime to prevent collisions with existing data.

Tests should create the state required for their execution whenever possible and clean up created resources when applicable. This keeps scenarios independent and repeatable.

## 5. Automation Strategy

Frontend interactions are encapsulated using Page Objects to separate test scenarios from page implementation details.

API interactions are encapsulated using Service Objects to separate HTTP communication from test scenarios and assertions.

Reusable Cypress behavior may be implemented through custom commands when it provides meaningful reuse without duplicating responsibilities already handled by Page or Service Objects.

Assertions remain within the test scenarios so that expected behavior is explicit and easy to understand.

## 6. Out of Scope

The following areas are outside the scope of this project:

* Performance and load testing.
* Accessibility testing.
* Cross-browser compatibility testing.
* Comprehensive regression coverage of the ServeRest application.
* Features unrelated to the selected product management workflows.

The scope is intentionally limited to the six scenarios defined above.
