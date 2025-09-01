'use strict';
import express from 'express';
import { ExpenseTrackerApp } from './db.js';
import { error } from 'console';
import e from 'express';

const app = express();
app.use(express.json());

app.post('/expenses', async (req, res) => {
  try {
    const { category, amount, description } = req.body;

    if (category === '') return res.json({ error: `Category Feild is Empty` });
    else if (amount === '') return res.json({ error: `Anount feild is Empty` });
    else if (description === '')
      return res.json({ error: `Description feild is Empty` });

    const expenses = await ExpenseTrackerApp.create({
      category,
      amount,
      description,
    });

    res.json({ message: `Expense is Created Successfully` });
  } catch (err) {
    res.json({
      error: `Expenses can not be Created`,
    });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await ExpenseTrackerApp.find();

    res.json({ message: `Expenses are Fetched Successfully`, expenses });
  } catch (err) {
    res.json({ error: `Unable to Fetched Expenses` });
  }
});

app.put('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, description } = req.body;

    const expenses = await ExpenseTrackerApp.findByIdAndUpdate(
      id,
      { category, amount, description },
      { new: true }
    );

    if (!expenses) {
      return res.json({ error: `Expense not Found` });
    }

    res.json({ message: `Expense is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Expense` });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const expenses = await ExpenseTrackerApp.findByIdAndDelete(id);

    if (!expenses) {
      return res.json({ error: `Expense not Found` });
    }

    res.json({ message: `Expense is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Expense` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
