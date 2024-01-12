const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    console.log(todos);
    res.send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(id, todo);
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, done } = req.body;
  const trimmedName = name.substring(0, 70);

  try {
    const todo = await Todo.create({
      name: trimmedName,
      done: done || false,
    });

    console.log(todo);
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findOneAndUpdate({ _id: id }, req.body);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(todo);
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(todo);
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
