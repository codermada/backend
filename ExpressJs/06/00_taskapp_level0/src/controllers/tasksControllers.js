// In-memory "database"
let tasks = require('../data.js');

const getTasks = (req, res) => {
  res.json(tasks);
};

const newTask = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

module.exports = {getTasks, newTask};