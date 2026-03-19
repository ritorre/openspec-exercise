## Why

Todo el código del servidor vive en un único fichero `server.js` (routes, lógica, almacenamiento, helpers). Esto funciona a 77 líneas, pero mezclar responsabilidades en un solo fichero dificulta el mantenimiento y la legibilidad a medida que el proyecto crece. Separar por capas hace que cada fichero tenga una responsabilidad clara y que los cambios futuros sean más localizados.

## What Changes

- Crear estructura de carpetas por capas: `routes/`, `middleware/`, `data/`
- Extraer los endpoints de tareas a `routes/tasks.js`
- Extraer los response helpers a `middleware/response.js`
- Extraer el almacenamiento en memoria a `data/store.js`
- `server.js` queda como punto de entrada mínimo: configura Express, registra middleware y monta rutas

## Capabilities

### New Capabilities
- `project-structure`: Convención de estructura de carpetas por capas para el proyecto

### Modified Capabilities
<!-- No cambian los contratos de API ni los requisitos de response-helpers o task-lookup.
     Es una reorganización interna pura. -->

## Impact

- `server.js`: Reducido a punto de entrada (~15 líneas)
- Nuevos ficheros: `routes/tasks.js`, `middleware/response.js`, `data/store.js`
- Sin cambios en contratos de API (mismos endpoints, mismas respuestas)
- Sin nuevas dependencias
