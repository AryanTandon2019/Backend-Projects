'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  `mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/TaskPrioritizerApp`
);

const taskPrioritizerSchema = new Schema({
  title: String,
  description: String,
  priority: String,
  deadline: Date,
});

export const TaskPrioritizerApp = mongoose.model(
  'TaskPrioritizerApp',
  taskPrioritizerSchema,
  'Tasks'
);
