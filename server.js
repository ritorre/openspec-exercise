const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Response helpers
function ok(res, data, status = 200) {
  res.status(status).json({ success: true, data });
}
function badRequest(res, error) {
  res.status(400).json({ success: false, error });
}
function notFound(res, error) {
  res.status(404).json({ success: false, error });
}

// Task lookup helper
function findTask(id) {
  return tasks.find(task => task.id === id);
}

// In-memory task storage
let tasks = [
  { id: 1, title: 'Aprender OpenSpec', completed: false },
  { id: 2, title: 'Completar el ejercicio', completed: false },
  { id: 3, title: 'Probar la API', completed: true }
];

let nextId = 4;

// GET /tasks - List all tasks
app.get('/tasks', (req, res) => {
  res.json({ success: true, count: tasks.length, data: tasks });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return badRequest(res, 'Title is required');
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
    // Note: Priority field will be added during the exercise
  };

  tasks.push(newTask);

  ok(res, newTask, 201);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = findTask(id);

  if (!task) {
    return notFound(res, 'Task not found');
  }

  tasks.splice(tasks.indexOf(task), 1);

  ok(res, task);
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Try: curl http://localhost:${PORT}/tasks`);
});
