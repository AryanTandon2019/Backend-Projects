'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/CommentSystemApp'
);

const commentSystemSchema = new Schema({
  userName: String,
  commentText: String,
  postId: String,
  createdAt: { type: Date, default: Date.now() },
});

export const CommentSystemApp = mongoose.model(
  'CommentSystemApp',
  commentSystemSchema,
  'Comments'
);
