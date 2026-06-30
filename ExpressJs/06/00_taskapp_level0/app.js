const app = require('./src/server.js');
const { getTasks, newTask } = require('./src/controllers/tasksControllers.js');

// GET all tasks
app.get("/tasks", getTasks);

// POST a new task
app.post("/tasks", newTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
