'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/BlogApiApp'
);

const blogAppSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: String,
  },
  { timestamps: true }
);

export const BlogApiApp = mongoose.model('BlogApiApp', blogAppSchema, 'Blogs');
