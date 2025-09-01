'use strict';

import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  `mongodb+srv://aryantandon2019:shanu2005tandon@buildprojects.mca6ejf.mongodb.net/ProductInventoryApp`
);

const productInventorySchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  lowStock: Boolean,
});

export const ProductInventoryApp = mongoose.model(
  'ProductInventoryApp',
  productInventorySchema,
  'Products'
);
