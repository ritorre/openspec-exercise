## 1. Add response helpers

- [x] 1.1 Add `ok(res, data, status = 200)` helper function to `server.js`
- [x] 1.2 Add `badRequest(res, error)` helper function to `server.js`
- [x] 1.3 Add `notFound(res, error)` helper function to `server.js`

## 2. Add task lookup helper

- [x] 2.1 Add `findTask(id)` helper function that looks up a task by numeric id

## 3. Refactor endpoints

- [x] 3.1 Refactor `GET /tasks` to use `ok()` for the success response
- [x] 3.2 Refactor `POST /tasks` to use `badRequest()` for missing title and `ok()` for success (status 201)
- [x] 3.3 Refactor `DELETE /tasks/:id` to use `findTask()` for lookup, `notFound()` for missing task, and `ok()` for success
