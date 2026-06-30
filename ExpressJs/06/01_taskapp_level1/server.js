const app = require('./app.js');
const { getTasks, newTask } = require('./controllers.js');

app.get("/tasks", getTasks);
app.post("/tasks", newTask);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});