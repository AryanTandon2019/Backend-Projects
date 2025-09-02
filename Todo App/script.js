'use strict';

import express from 'express';
import { TodoApp } from './db.js';
import { error } from 'console';

const app = express();

app.use(express.json());

app.post('/todos', async (req, res) => {  
  const { task, desc, isDone } = req.body;

  if (task == '') return res.json({ error: `Task feild is Empty` });
  else if (desc == '') return res.json({ error: `Desc feild is Empty` });

  try {
    await TodoApp.create({
      task,
      desc,
      isDone,
    });
    res.json({ message: `Todo Created Succesfully` });
  } catch (err) {
    res.json({ error: `Failed to Create Todo` });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await TodoApp.find();
    res.json({
      todos: allTodos,
    });
  } catch (err) {
    res.json({ error: 'Failed to Fetch Todos' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, desc, isDone } = req.body;

  try {
    const updateTodo = await TodoApp.findByIdAndUpdate(
      id,
      { task, desc, isDone },
      { new: true }
    );
    if (!updateTodo) {
      return res.json({ error: `Todo not Found` });
    }

    res.json({ message: 'Todo Update Succesfully' });
  } catch (err) {
    res.json({ error: 'Failed to Update Todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = await TodoApp.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.json({ error: `Todo not Found` });
    }

    res.json({ message: `Todo Succesfully Deleted` });
  } catch (err) {
    res.json({ message: `Failed to Delete Todo` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);  
});
