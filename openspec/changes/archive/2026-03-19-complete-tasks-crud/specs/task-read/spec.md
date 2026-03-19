## ADDED Requirements

### Requirement: Read single task by id
The system SHALL expose `GET /tasks/:id` to retrieve a single task by its numeric id.

#### Scenario: Task found
- **WHEN** `GET /tasks/:id` is called with an id matching an existing task
- **THEN** the response status MUST be 200 and body MUST be `{ success: true, data: <task> }`

#### Scenario: Task not found
- **WHEN** `GET /tasks/:id` is called with an id that does not match any task
- **THEN** the response status MUST be 404 and body MUST be `{ success: false, error: 'Task not found' }`

#### Scenario: Non-numeric id
- **WHEN** `GET /tasks/:id` is called with a non-numeric id (e.g. `/tasks/abc`)
- **THEN** the response status MUST be 404 (treated as not found)
