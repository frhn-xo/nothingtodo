const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const Todo = require('./models/todo');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('connected to db');
  })
  .catch(() => {
    console.log("could'nt connect to db");
  });

app.get('/todos', async (req, res) => {
  const todos = await Todo.find({});
  console.log(todos);
  res.send(todos);
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  console.log(id, todo);
  res.send(todo);
});

app.post('/todos', async (req, res) => {
  const todo = await Todo.create(req.body);
  console.log(todo);
  res.send(todo);
});

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOneAndUpdate({ _id: id }, req.body);
  console.log(todo);
  res.send(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const todo = await Todo.findOneAndDelete({ _id: id });
  console.log(todo);
  res.send(todo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
