'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/NotesApp'
);

const noteSchema = new Schema({
  title: String,
  content: String,
  tag: String,
  createdAt: { type: Date, default: Date.now() },
});

export const NotesApp = mongoose.model('NotesApp', noteSchema, 'Notes');
