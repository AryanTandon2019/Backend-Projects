'use strict';

import mongoose, { Schema } from 'mongoose';
import { type } from 'os';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/FeedbackCollectorApp'
);

const feedbackCollectorSchema = new Schema({
  name: String,
  feedback: String,
  rating: { type: Number, min: 1, max: 5 },
  isAnonymous: Boolean,
});

export const FeedbackCollectorApp = mongoose.model(
  'FeedbackCollectorApp',
  feedbackCollectorSchema,
  'Feedbacks'
);
    