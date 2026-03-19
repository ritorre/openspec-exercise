## 1. Añadir GET /tasks/:id

- [x] 1.1 Añadir handler `router.get('/:id', ...)` en `routes/tasks.js` que use `findTask` y responda con `ok` o `notFound`

## 2. Añadir PUT /tasks/:id

- [x] 2.1 Añadir handler `router.put('/:id', ...)` en `routes/tasks.js` que use `findTask` para localizar la tarea
- [x] 2.2 Aplicar los campos `title` y `completed` del body a la tarea (solo si están presentes), ignorar `id`
- [x] 2.3 Responder con `ok(res, task)` devolviendo la tarea actualizada, o `notFound` si no existe
