const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo_list");

const TodoSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});
const Todo = mongoose.model("Todo", TodoSchema);

app.post("/add", async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      done: false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

app.get("/get", async (req, res) => {
  const todos = await Todo.find();
  res.json({ data: todos });
});

app.put("/update/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, { done: true });
  res.sendStatus(200);
});

app.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
