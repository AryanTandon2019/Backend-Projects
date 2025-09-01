'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/ExpenseTrackerApp'
);

const expenseTrackerSchema = new Schema({
  category: String,
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now() },
});

export const ExpenseTrackerApp = mongoose.model(
  'ExpenseTrackerApp',
  expenseTrackerSchema,
  'Expenses'
);
