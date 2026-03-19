## ADDED Requirements

### Requirement: Success response helper
The system SHALL provide an `ok(res, data, status)` helper that responds with `{ success: true, data }` and the given HTTP status (default 200).

#### Scenario: Default 200 response
- **WHEN** `ok(res, someData)` is called with no explicit status
- **THEN** the response status MUST be 200 and body MUST be `{ success: true, data: someData }`

#### Scenario: Custom status code
- **WHEN** `ok(res, someData, 201)` is called
- **THEN** the response status MUST be 201 and body MUST be `{ success: true, data: someData }`

### Requirement: Bad request response helper
The system SHALL provide a `badRequest(res, error)` helper that responds with HTTP 400 and `{ success: false, error }`.

#### Scenario: Missing required field
- **WHEN** `badRequest(res, 'Title is required')` is called
- **THEN** the response status MUST be 400 and body MUST be `{ success: false, error: 'Title is required' }`

### Requirement: Not found response helper
The system SHALL provide a `notFound(res, error)` helper that responds with HTTP 404 and `{ success: false, error }`.

#### Scenario: Resource missing
- **WHEN** `notFound(res, 'Task not found')` is called
- **THEN** the response status MUST be 404 and body MUST be `{ success: false, error: 'Task not found' }`
