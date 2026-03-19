## Context

`routes/tasks.js` ya tiene `GET /tasks`, `POST /tasks` y `DELETE /tasks/:id`. La infraestructura está lista: `findTask(id)` resuelve la búsqueda por id, y los helpers `ok`/`notFound`/`badRequest` manejan respuestas. Añadir las dos operaciones restantes es additive — no toca código existente.

## Goals / Non-Goals

**Goals:**
- `GET /tasks/:id` devuelve la tarea con ese id o 404 si no existe
- `PUT /tasks/:id` acepta `{ title, completed }` (ambos opcionales), actualiza los campos enviados, devuelve la tarea actualizada
- Comportamiento consistente con los endpoints existentes (mismo envelope `{ success, data }`)

**Non-Goals:**
- PATCH semántico (solo PUT)
- Validación de tipo estricta en campos (e.g. `completed` debe ser boolean)
- Persistencia — sigue siendo in-memory
- Paginación u ordenación en `GET /tasks`

## Decisions

### PUT vs PATCH
**Decisión:** `PUT /tasks/:id` con actualización parcial implícita (solo se actualizan los campos presentes en el body).

**Rationale:** PUT es más familiar y más simple. La actualización parcial es un comportamiento razonable para recursos pequeños. Usar PATCH añadiría complejidad semántica sin beneficio real a esta escala.

**Alternativa descartada:** PATCH puro — más correcto según RFC 5789, pero innecesariamente complejo aquí.

---

### Campos actualizables
**Decisión:** `title` y `completed` son actualizables. `id` es siempre inmutable.

**Rationale:** Son los únicos campos de dominio del modelo de tarea. El id lo asigna el servidor y no debe cambiar.

---

### Respuesta de PUT
**Decisión:** Devuelve la tarea completa actualizada con HTTP 200.

```json
{ "success": true, "data": { "id": 1, "title": "...", "completed": true } }
```

**Rationale:** Más útil para el cliente — no necesita hacer un segundo GET para ver el estado final. Consistente con el comportamiento de POST (devuelve el recurso creado).

---

### id no-numérico (e.g. `GET /tasks/abc`)
**Decisión:** `parseInt("abc")` = `NaN` → `findTask(NaN)` = `undefined` → 404.

**Rationale:** Comportamiento actual en DELETE ya funciona así. Mantener consistencia sin añadir validación extra.

## Risks / Trade-offs

- **[Riesgo] PUT sin body actualiza nada** → Si el cliente manda `{}`, la tarea no cambia pero se devuelve 200. Semánticamente correcto (no hay error), potencialmente confuso. Mitigación: documentado en spec con escenario explícito.
- **[Trade-off] `completed` sin validación de tipo** → `{ "completed": "yes" }` almacenaría un string. Aceptado: la validación de tipos pertenece a una capa futura (schema validation).
