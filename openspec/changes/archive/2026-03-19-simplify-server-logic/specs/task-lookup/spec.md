## ADDED Requirements

### Requirement: Task lookup by id
The system SHALL provide a `findTask(id)` helper that returns the task object with the matching numeric id, or `undefined` if not found.

#### Scenario: Task exists
- **WHEN** `findTask(id)` is called with an id that matches a task in storage
- **THEN** it MUST return the full task object

#### Scenario: Task does not exist
- **WHEN** `findTask(id)` is called with an id that has no matching task
- **THEN** it MUST return `undefined`

### Requirement: Endpoints use centralized lookup
All endpoints that operate on a specific task by id SHALL use `findTask` instead of inline array traversal.

#### Scenario: DELETE uses findTask
- **WHEN** `DELETE /tasks/:id` is called
- **THEN** task resolution MUST go through `findTask`, and a 404 response MUST be sent if it returns `undefined`
