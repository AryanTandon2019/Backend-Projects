'use strict';

import mongoose, { Schema } from 'mongoose';
import { type } from 'os';

mongoose.connect(
  `mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/EventPlannerApp`
);

const eventPlannerSchema = new Schema({
  title: String,
  description: String,
  eventDateTime: { type: Date, default: Date.now() },
  location: String,
  isRSVP: { type: Boolean, default: false },
});

export const EventPlannerApp = mongoose.model(
  'EventPlannerApp',
  eventPlannerSchema,
  'Events'
);
