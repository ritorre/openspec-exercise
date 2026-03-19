const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Try: curl http://localhost:${PORT}/tasks`);
});
