## Context

El proyecto es una API Express de tareas en un único fichero `server.js`. Tras el refactor anterior, ya existen helpers bien definidos (`ok`, `badRequest`, `notFound`, `findTask`). El siguiente paso natural es mover esos módulos lógicos a ficheros propios, dejando `server.js` como punto de entrada.

Estado actual:

```
server.js
├── helpers: ok, badRequest, notFound, findTask
├── data:    tasks[], nextId
└── routes:  GET /tasks, POST /tasks, DELETE /tasks/:id
```

Estado objetivo:

```
server.js               ← entrada: configura app, monta rutas
routes/
  tasks.js              ← endpoints de tareas
middleware/
  response.js           ← ok, badRequest, notFound
data/
  store.js              ← tasks[], nextId, findTask
```

## Goals / Non-Goals

**Goals:**
- Cada fichero tiene una única responsabilidad
- `server.js` queda como configuración pura (~15 líneas)
- Los módulos se exportan e importan con `require`/`module.exports` (CommonJS, consistente con el proyecto actual)
- Cero cambios en comportamiento observable de la API

**Non-Goals:**
- Introducir ES Modules (`import`/`export`)
- Añadir un framework de routing diferente a Express Router
- Crear capas adicionales (controllers, services, repositories)
- Cambiar endpoints, códigos de estado o estructura de respuesta

## Decisions

### CommonJS vs ES Modules
**Decisión:** CommonJS (`require`/`module.exports`).

**Rationale:** El proyecto usa Node.js con `package.json` sin `"type": "module"`, y Express 4.x es nativamente CommonJS. Cambiar a ESM introduciría fricción innecesaria.

---

### Express Router vs ficheros de rutas planos
**Decisión:** Usar `express.Router()` en `routes/tasks.js`.

**Rationale:** Router es el patrón canónico de Express para agrupar rutas. Permite montar el router en `server.js` con `app.use('/tasks', tasksRouter)`, lo que hace explícito el prefijo de ruta y facilita añadir más routers en el futuro.

---

### `findTask` en `data/store.js` vs `middleware/response.js`
**Decisión:** `findTask` va en `data/store.js`.

**Rationale:** `findTask` opera sobre el array de datos (`tasks`), no sobre la respuesta HTTP. Colocarlo con los datos es semánticamente correcto y evita que `middleware/response.js` tenga dependencia del store.

---

### Estructura de carpetas
```
routes/      → handlers HTTP
middleware/  → utilidades de respuesta (y futuros middleware Express)
data/        → estado y acceso a datos
```

No se usa `src/` como envoltorio: el proyecto es pequeño y añadir un nivel extra no aporta valor ahora.

## Risks / Trade-offs

- **[Riesgo] Circular dependencies** si `routes/tasks.js` importa de `middleware/response.js` y éste importara de `routes/` → Mitigación: `middleware/response.js` no importa nada del proyecto; solo usa el objeto `res` de Express.
- **[Trade-off] Más ficheros para un proyecto pequeño** → Aceptado conscientemente: el objetivo es practicar la estructura, no optimizar el número de ficheros.

## Migration Plan

1. Crear `data/store.js` con `tasks`, `nextId`, `findTask` — exportar todo
2. Crear `middleware/response.js` con `ok`, `badRequest`, `notFound` — exportar todo
3. Crear `routes/tasks.js` importando store y response helpers, definir el router con los tres endpoints
4. Reescribir `server.js` para importar y montar el router
5. Verificar que los tres endpoints responden igual que antes
