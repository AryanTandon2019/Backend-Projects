'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/UserAuthSystem'
);

const userAuthSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserAuthSystem = mongoose.model(
  'UserAuthSystem',
  userAuthSchema,
  'Users'
);
