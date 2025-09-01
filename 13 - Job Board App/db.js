'use strict';

import mongoose, { mongo, Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/JobBoardApp'
);

const jobBoardSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: Number,
  description: String,
  postedAt: { type: Date, default: Date.now },
});

export const JobBoardApp = mongoose.model(
  'JobBoardApp',
  jobBoardSchema,
  'Jobs'
);
