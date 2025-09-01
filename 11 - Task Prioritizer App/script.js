'use strict';

import express from 'express';
import { TaskPrioritizerApp } from './db.js';
import { error } from 'console';

const app = express();

app.use(express.json());

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    let deadline;

    if (title === '') return res.json({ error: `Title Field is Empty` });
    else if (description === '')
      return res.json({ error: `Description Fiels is Empty` });
    else if (priority === '')
      return res.json({ error: `Please Set the Task Priority` });

    if (req.body.deadline === '' || req.body.deadline === undefined) {
      deadline = null;
    } else {
      deadline = new Date(req.body.deadline);
    }

    await TaskPrioritizerApp.create({
      title,
      description,
      priority,
      deadline,
    });

    res.json({ message: `Task is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Task` });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const task = await TaskPrioritizerApp.find();

    res.json({ message: `Task is Fetched Successfully`, task });
  } catch (err) {
    return res.json({ error: `Unable to Fetch Task` });
  }
});

app.get('/tasks/sort-by-priority', async (req, res) => {
  try {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    const tasks = await TaskPrioritizerApp.find();

    const sortedTask = tasks.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.json({
      message: `Task Sorted by Priority`,
      tasks: sortedTask,
    });
  } catch (err) {
    res.json({ error: `Unable to Sort Task by Priority` });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;

    const task = await TaskPrioritizerApp.findByIdAndUpdate(
      id,
      { title, description, priority, deadline },
      { new: true }
    );

    if (!task) return res.json({ error: `Task not Found` });

    res.json({ message: `Task is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Task` });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskPrioritizerApp.findByIdAndDelete(id);
    if (!task) return res.json({ error: `Task not Found` });

    res.json({ message: `Task is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Task` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
