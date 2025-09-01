'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/CalculatorApp'
);

const calculatorSchema = new Schema({
  a: Number,
  b: Number,
  op: String,
  result: mongoose.Schema.Types.Mixed,
});

export const CalculatorApp = mongoose.model(
  'CalculatorApp',
  calculatorSchema,
  'Calculations'
);
