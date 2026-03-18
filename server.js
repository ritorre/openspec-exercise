const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: 'Aprender OpenSpec', completed: false },
  { id: 2, title: 'Completar el ejercicio', completed: false },
  { id: 3, title: 'Probar la API', completed: true }
];

let nextId = 4;

// GET /tasks - List all tasks
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
    // Note: Priority field will be added during the exercise
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask
  });
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json({
    success: true,
    data: deletedTask
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Try: curl http://localhost:${PORT}/tasks`);
});
