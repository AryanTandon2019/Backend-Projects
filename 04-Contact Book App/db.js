'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/ContactBookApp'
);

const contactBookSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
});

export const ContactBookApp = mongoose.model(
  'ContactBookApp',
  contactBookSchema,
  'Contacts'
);
