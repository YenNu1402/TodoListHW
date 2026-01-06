const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// READ
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// CREATE
app.post("/api/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    status: "todo"
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// UPDATE
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.map(t =>
    t.id === id ? { ...t, ...req.body } : t
  );
  res.sendStatus(200);
});

// DELETE
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
