const express = require('express');
const { store, findTask } = require('../data/store');
const { ok, badRequest, notFound } = require('../middleware/response');

const router = express.Router();

// GET /tasks - List all tasks
router.get('/', (req, res) => {
  res.json({ success: true, count: store.tasks.length, data: store.tasks });
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return badRequest(res, 'Title is required');
  }

  const newTask = {
    id: store.nextId++,
    title,
    completed: false
  };

  store.tasks.push(newTask);

  ok(res, newTask, 201);
});

// GET /tasks/:id - Get a single task
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = findTask(id);

  if (!task) {
    return notFound(res, 'Task not found');
  }

  ok(res, task);
});

// PUT /tasks/:id - Update a task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = findTask(id);

  if (!task) {
    return notFound(res, 'Task not found');
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  ok(res, task);
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = findTask(id);

  if (!task) {
    return notFound(res, 'Task not found');
  }

  store.tasks.splice(store.tasks.indexOf(task), 1);

  ok(res, task);
});

module.exports = router;
