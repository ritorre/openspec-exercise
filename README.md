# OpenSpec Exercise

A hands-on exercise to learn specification-driven development with OpenSpec and Claude Code.

## Quick Start

```bash
# Install dependencies
npm install

# Run the server
npm start

# Or run with auto-reload (development)
npm run dev
```

The API will be available at `http://localhost:3000`

## Test the API

```bash
# List all tasks
curl http://localhost:3000/tasks

# Create a new task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Nueva tarea"}'

# Delete a task (replace :id with actual task ID)
curl -X DELETE http://localhost:3000/tasks/1
```

## Exercise

See **[EJERCICIO.md](./EJERCICIO.md)** for the complete walkthrough.

You'll learn how to:
- Explore codebases with OpenSpec
- Propose structured changes
- Implement features with delta specs
- Maintain persistent project context

## Current API Endpoints

- `GET /tasks` - List all tasks
- `POST /tasks` - Create a task (body: `{ title }`)
- `DELETE /tasks/:id` - Delete a task

## What You'll Add

During the exercise, you'll add task priorities (alta/media/baja) and filtering capabilities using the OpenSpec workflow.
