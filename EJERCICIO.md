# Ejercicio OpenSpec: Desarrollo Guiado por Especificaciones

**Duración estimada:** 10-15 minutos
**Objetivo:** Experimentar el flujo completo de OpenSpec desde exploración hasta implementación y archivo.

## Escenario

Tienes una API REST simple para gestión de tareas. El cliente necesita **añadir prioridades** a las tareas (alta, media, baja) con capacidad de filtrado. En lugar de codificar directamente, usarás OpenSpec para:

1. Explorar el código existente
2. Proponer cambios estructurados
3. Implementar siguiendo especificaciones
4. Archivar conocimiento para futuros desarrolladores

---

## 1. Instalación y Configuración

### Instalar OpenSpec

```bash
npm install -g @fission-ai/openspec
```

### Inicializar en el proyecto

```bash
cd openspec-exercise
openspec init --tools claude
```

### 🔍 Observar qué se generó

Abre el explorador de archivos y revisa:

```
.claude/
└── skills/          # ← Comandos OpenSpec como skills de Claude Code
    ├── opsx-explore.md
    ├── opsx-propose.md
    ├── opsx-apply.md
    └── ...

openspec/
├── changes/         # ← Workspace para cambios activos (proposals, designs, tasks)
└── specs/           # ← Especificaciones principales (source of truth del proyecto)
```

**¿Qué significa?** OpenSpec integra sus comandos como "skills" nativos de Claude Code. Ahora puedes usar `/opsx:explore`, `/opsx:propose`, etc. directamente en el chat.

---

## 2. Exploración (Thinking Partner)

Antes de proponer código, usa OpenSpec como compañero de pensamiento.

### Comando

En Claude Code, escribe:

```
/opsx:explore "¿Cómo añadiría prioridades a las tareas sin romper lo existente?"
```

### 🔍 Observar

Claude va a:
- Leer `server.js` y entender la estructura actual
- Analizar endpoints existentes
- Sugerir enfoques compatibles con el código actual
- Identificar dónde añadir el campo `priority`

**Punto clave:** No se escribe código todavía. Es exploración pura para entender el terreno.

---

## 3. Propuesta Estructurada

Ahora convierte esas ideas en una propuesta formal.

### Comando

```
/opsx:propose "Añadir prioridades alta/media/baja con filtrado por query parameter"
```

### 🔍 Observar los 4 artefactos

Se crea una carpeta en `openspec/changes/<nombre-auto>/` con:

#### 1. **proposal.md** — ¿Qué y por qué?
```markdown
# Proposal: Task Priorities

## Scope
Add priority field (alta/media/baja) to tasks with filtering support

## Success Criteria
- [ ] Tasks have priority field
- [ ] GET /tasks?priority=alta works
- [ ] Existing tasks not broken
```

#### 2. **design.md** — ¿Cómo?
```markdown
# Design: Task Priorities

## Data Model
Task: { id, title, completed, priority: 'alta'|'media'|'baja' }

## API Changes
- POST /tasks: Accept optional `priority` (default: 'media')
- GET /tasks: Add `?priority=X` query parameter
```

#### 3. **tasks.md** — Checklist de implementación
```markdown
# Tasks

- [ ] Add priority field to task model
- [ ] Update POST /tasks to accept priority
- [ ] Add filtering logic to GET /tasks
- [ ] Update sample data with priorities
```

#### 4. **specs/task-priorities/spec.md** — Delta spec
```markdown
# Spec: Task Priorities

## ADDED Requirements
- REQ-001: Tasks MUST have priority field (alta/media/baja)
- REQ-002: GET /tasks MUST support ?priority filter

## MODIFIED Requirements
- REQ-010: POST /tasks accepts optional priority (was: only title)
```

**¿Por qué esto importa?** Cada artefacto tiene un propósito:
- **Proposal:** Convence stakeholders (¿vale la pena?)
- **Design:** Guía técnica (¿cómo lo construyo?)
- **Tasks:** Plan ejecutable (¿qué sigue?)
- **Spec:** Contrato duradero (¿qué promete el sistema?)

---

## 4. Validación de Especificación

Antes de implementar, verifica que las specs estén bien formadas.

### Comando

```bash
openspec validate
```

### 🔍 Qué verifica

- Formato correcto de los archivos spec
- Presencia de secciones requeridas
- Consistencia en identificadores (REQ-XXX)

Si hay errores, te dirá exactamente dónde están.

---

## 5. Implementación

Ahora sí: código.

### Comando

```
/opsx:apply
```

### 🔍 Observar

Claude va a:
1. Leer `tasks.md` (la checklist)
2. Implementar cada tarea en orden
3. Marcar `[x]` cada tarea completada
4. Modificar `server.js` siguiendo `design.md`

**Abre `server.js` después** y verás:
- Campo `priority` en el modelo de tarea
- Lógica de filtrado en `GET /tasks`
- Validación en `POST /tasks`

### Probar la implementación

```bash
# Terminal 1: Inicia el servidor
npm start

# Terminal 2: Prueba endpoints
curl http://localhost:3000/tasks
curl http://localhost:3000/tasks?priority=alta
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarea urgente","priority":"alta"}'
```

---

## 6. Archivar y Fusionar

La feature funciona. Ahora convierte el conocimiento temporal en permanente.

### Comando

```
/opsx:archive
```

### 🔍 Qué pasa

1. **Delta specs** en `openspec/changes/<nombre>/specs/` se fusionan en `openspec/specs/`
2. La carpeta de cambio se mueve a `openspec/changes/archive/YYYY-MM-DD-<nombre>/`
3. El conocimiento de "task priorities" ahora es parte del proyecto permanentemente

### Abrir y revisar

```
openspec/specs/
└── task-priorities/
    └── spec.md          # ← Ahora es la fuente de verdad oficial
```

**¿Por qué archivar?** Separa trabajo activo (cambios en curso) de conocimiento establecido (specs fusionadas). El repo queda limpio y las specs reflejan el estado actual del sistema.

---

## 7. Reflexión: Contexto Persistente

Aquí está el valor real de OpenSpec.

### Ejercicio

1. **Cierra Claude Code** completamente
2. **Abre una nueva sesión** (chat vacío, sin historial)
3. Pregunta a Claude:

```
¿Qué features tiene este proyecto? ¿Qué endpoints soporta la API?
```

### 🔍 Observar

Claude responderá con información sobre:
- Prioridades de tareas (alta/media/baja)
- Filtrado por query parameter
- Estructura completa de la API

**¿Cómo lo sabe?** No está adivinando. Está leyendo `openspec/specs/`.

### Pregunta clave: ¿Qué problema resuelve esto?

**Sin specs:**
- Nueva persona → "Explícame todo el proyecto"
- Nueva sesión → "No recuerdo qué hicimos"
- 6 meses después → "¿Por qué decidimos X?"

**Con specs:**
- Las decisiones viven en archivos, no en memoria de chat
- Nuevos miembros del equipo leen `openspec/specs/` y se ponen al día
- El contexto no se pierde entre sesiones
- Las especificaciones evolucionan con el código (no quedan obsoletas)

---

## Resumen: Flujo OpenSpec

```
1. /opsx:explore    → Investigar sin compromisos
2. /opsx:propose    → Crear proposal + design + tasks + delta specs
3. openspec validate → Verificar specs antes de implementar
4. /opsx:apply      → Implementar siguiendo tasks.md
5. /opsx:archive    → Fusionar specs y archivar cambio
```

**Beneficios clave:**
- ✅ Exploración estructurada antes de codificar
- ✅ Propuestas con artefactos separados (proposal/design/tasks/specs)
- ✅ Delta specs explícitos (ADDED/MODIFIED/REMOVED)
- ✅ Contexto persistente que sobrevive sesiones
- ✅ Documentación viva sincronizada con código

---

## Próximos Pasos

- **Lee las specs fusionadas:** `openspec/specs/task-priorities/spec.md`
- **Revisa el archivo:** `openspec/changes/archive/<fecha>/`
- **Propón otro cambio:** ¿Qué tal añadir fechas de vencimiento?

```
/opsx:propose "Añadir due dates a las tareas con soporte de ordenamiento"
```

¡Experimenta el ciclo completo de nuevo! 🚀
