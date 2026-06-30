const sqlite3 = require("sqlite3").verbose();

// Open (or create) DB
const db = new sqlite3.Database("./database.db");

// Create table on startup
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )
`);

module.exports = db;