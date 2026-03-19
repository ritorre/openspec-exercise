## Why

La API de tareas solo implementa 3 de las 5 operaciones CRUD. Sin `GET /tasks/:id` ni `PUT /tasks/:id`, los clientes no pueden leer una tarea individual ni actualizarla — lo que hace la API prácticamente de solo-lectura/escritura parcial. Completar el CRUD la convierte en una API utilizable de verdad.

## What Changes

- Añadir `GET /tasks/:id` — devuelve una tarea individual por id
- Añadir `PUT /tasks/:id` — actualiza `title` y/o `completed` de una tarea existente, devuelve la tarea actualizada

## Capabilities

### New Capabilities
- `task-read`: Lectura de una tarea individual por id (`GET /tasks/:id`)
- `task-update`: Actualización de campos de una tarea existente (`PUT /tasks/:id`)

### Modified Capabilities
<!-- No cambian requisitos existentes — son operaciones nuevas sobre el mismo recurso -->

## Impact

- `routes/tasks.js`: Añadir dos nuevos handlers al router
- `openspec/specs/`: Nuevas specs para `task-read` y `task-update`
- Sin cambios en endpoints existentes ni en contratos de respuesta actuales
- Sin nuevas dependencias
