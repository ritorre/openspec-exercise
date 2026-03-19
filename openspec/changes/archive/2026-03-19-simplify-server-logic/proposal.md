## Why

`server.js` repeats the same JSON response envelope and task-lookup pattern across every endpoint. As new endpoints are added (e.g. filtering, updates), this duplication will grow and become a maintenance burden.

## What Changes

- Extract response helper functions (`ok`, `badRequest`, `notFound`) to eliminate repeated `{ success, data/error }` construction
- Extract `findTaskById` helper to centralize task lookup and 404 handling
- All three existing endpoints refactored to use the new helpers

## Capabilities

### New Capabilities
- `response-helpers`: Shared functions for building consistent JSON API responses (`ok`, `badRequest`, `notFound`)
- `task-lookup`: Centralized task-by-id resolution with built-in not-found error handling

### Modified Capabilities
<!-- No spec-level behavior changes — this is a pure internal refactor. API contracts remain identical. -->

## Impact

- `server.js`: All three endpoints updated to use shared helpers
- No API contract changes (same request/response shapes, same status codes)
- No new dependencies
