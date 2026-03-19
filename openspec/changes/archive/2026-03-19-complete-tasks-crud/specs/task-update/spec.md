## ADDED Requirements

### Requirement: Update task fields via PUT
The system SHALL expose `PUT /tasks/:id` to update `title` and/or `completed` of an existing task. Only fields present in the request body are applied; absent fields remain unchanged.

#### Scenario: Update completed status
- **WHEN** `PUT /tasks/:id` is called with `{ "completed": true }` for an existing task
- **THEN** the response status MUST be 200 and body MUST be `{ success: true, data: <updated task> }` with `completed` set to `true`

#### Scenario: Update title
- **WHEN** `PUT /tasks/:id` is called with `{ "title": "New title" }` for an existing task
- **THEN** the response status MUST be 200 and body MUST be `{ success: true, data: <updated task> }` with `title` set to `"New title"`

#### Scenario: Update both fields
- **WHEN** `PUT /tasks/:id` is called with `{ "title": "New title", "completed": true }` for an existing task
- **THEN** both fields MUST be updated and returned in the response

#### Scenario: Empty body — no changes
- **WHEN** `PUT /tasks/:id` is called with `{}` for an existing task
- **THEN** the response status MUST be 200 and the task MUST remain unchanged

#### Scenario: Task not found
- **WHEN** `PUT /tasks/:id` is called with an id that does not match any task
- **THEN** the response status MUST be 404 and body MUST be `{ success: false, error: 'Task not found' }`

### Requirement: id is immutable
The `id` field of a task MUST NOT be modified by `PUT /tasks/:id`, even if the request body includes an `id` field.

#### Scenario: id in body is ignored
- **WHEN** `PUT /tasks/:id` is called with a body containing `{ "id": 999 }`
- **THEN** the task's id MUST remain unchanged
