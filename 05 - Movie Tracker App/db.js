'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/MovieTrackerApp'
);

const movieTrackerSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
  watched: Boolean,
});

export const MovieTrackerApp = mongoose.model(
  'MovieTrackerApp',
  movieTrackerSchema,
  'Movies'
);
