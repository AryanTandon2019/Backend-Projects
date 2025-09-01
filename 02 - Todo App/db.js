'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/TodoApp'
);

const todoSchema = new Schema({
  task: String,
  desc: String,
  isDone: Boolean,
});

export const TodoApp = mongoose.model('TodoApp', todoSchema, 'Todos');
