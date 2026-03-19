## 1. Crear capa de datos

- [x] 1.1 Crear `data/store.js` con `tasks[]`, `nextId` y la función `findTask(id)`, exportando todo via `module.exports`

## 2. Crear capa de middleware

- [x] 2.1 Crear `middleware/response.js` con las funciones `ok`, `badRequest` y `notFound`, exportando todo via `module.exports`

## 3. Crear capa de rutas

- [x] 3.1 Crear `routes/tasks.js` importando store y response helpers
- [x] 3.2 Definir `express.Router()` y mover los tres endpoints (`GET /`, `POST /`, `DELETE /:id`) al router
- [x] 3.3 Exportar el router via `module.exports`

## 4. Refactorizar el punto de entrada

- [x] 4.1 Reescribir `server.js` para importar y montar el router de tareas en `/tasks`, eliminando todo el código inline de rutas, helpers y datos
