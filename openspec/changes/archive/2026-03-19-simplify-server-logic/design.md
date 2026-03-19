## Context

`server.js` is a single-file Express API with three endpoints. Each endpoint manually constructs `{ success, data }` / `{ success, error }` response objects and the DELETE route hand-rolls task lookup + 404 handling inline. The code is correct but not DRY — adding new endpoints will repeat these patterns.

## Goals / Non-Goals

**Goals:**
- Extract response-building into small, named helper functions
- Extract task-by-id lookup into a reusable helper
- Keep all helpers co-located in `server.js` (no new files at this scale)
- Zero behavior changes — identical API contracts before and after

**Non-Goals:**
- Splitting into multiple files / modules
- Adding a data-access layer or repository pattern
- Changing any request/response shape or HTTP status codes
- Adding new endpoints or features

## Decisions

### Inline helpers vs. separate module
**Decision:** Keep helpers as plain functions inside `server.js`.

**Rationale:** The file is 77 lines. Introducing a `utils/response.js` module would add indirection without real benefit at this scale. If the project grows to multiple route files, extraction becomes worthwhile then.

**Alternatives considered:** `utils/response.js` module — rejected for over-engineering a single-file project.

---

### Helper signatures

```js
// Response helpers
function ok(res, data, status = 200)  → res.status(status).json({ success: true, data })
function badRequest(res, error)       → res.status(400).json({ success: false, error })
function notFound(res, error)         → res.status(404).json({ success: false, error })

// Task lookup helper
function findTask(id)  → returns task object or undefined
```

`GET /tasks` also sends `count` — that stays inline (unique to list endpoint, not worth abstracting).

**Rationale:** Small, single-purpose functions with obvious names. No magic, easy to read at a glance.

## Risks / Trade-offs

- **Risk: over-abstracting a simple file** → Mitigation: helpers are functions, not classes; no framework introduced; inline in same file.
- **Risk: `count` field in GET /tasks is lost** → Mitigation: explicitly keep it inline (not routed through `ok()`), or pass extra fields. Decision: keep `count` inline for that one endpoint.

## Migration Plan

1. Add helper functions at the top of `server.js` (after middleware setup)
2. Refactor each endpoint one at a time, verifying responses unchanged
3. No deployment ceremony needed — pure internal refactor, same observable behavior
