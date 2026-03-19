# Spec: Project Structure

## Purpose

Defines how the project's source code is organized into layers, each with a single responsibility, and the rules governing module boundaries and the entry point.

## Requirements

### Requirement: Layered directory structure
The project MUST organize source code into distinct layers with one responsibility each: `routes/` for HTTP handlers, `middleware/` for Express utilities, `data/` for in-memory state and access functions.

#### Scenario: Routes layer exists
- **WHEN** the project is inspected
- **THEN** a `routes/` directory MUST exist containing at minimum `tasks.js`

#### Scenario: Middleware layer exists
- **WHEN** the project is inspected
- **THEN** a `middleware/` directory MUST exist containing at minimum `response.js`

#### Scenario: Data layer exists
- **WHEN** the project is inspected
- **THEN** a `data/` directory MUST exist containing at minimum `store.js`

### Requirement: Minimal entry point
`server.js` SHALL only configure the Express application, register middleware, and mount routers. It MUST NOT contain route handlers, response helpers, or data storage directly.

#### Scenario: server.js has no inline route handlers
- **WHEN** `server.js` is read
- **THEN** no `app.get`, `app.post`, or `app.delete` handler definitions MUST appear inline — only `app.use()` to mount routers

### Requirement: Module boundaries via CommonJS
Each layer module MUST export its public interface via `module.exports` and import dependencies via `require`. Cross-layer imports MUST follow the allowed dependency direction: `routes` → `data` and `routes` → `middleware`; `middleware` MUST NOT import from `routes` or `data`.

#### Scenario: routes imports from data and middleware
- **WHEN** `routes/tasks.js` is loaded
- **THEN** it MUST import store functions from `data/store.js` and response helpers from `middleware/response.js`

#### Scenario: middleware has no project imports
- **WHEN** `middleware/response.js` is loaded
- **THEN** it MUST NOT import any other project module
