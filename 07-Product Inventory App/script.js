'use strict';

import express from 'express';
import { ProductInventoryApp } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    if (name === '') return res.json({ error: `Name Feild is Empty` });
    else if (price === '') return res.json({ error: `Price Feild is Empty` });
    else if (quantity === '')
      return res.json({ error: `Quantity Feild is Empty` });

    const lowStock = quantity <= 5;

    await ProductInventoryApp.create({
      name,
      price,
      quantity,
      lowStock,
    });

    if (lowStock)
      return res.json({
        message: `Product is Succesfully Created but Stock is Low`,
      });

    res.json({ message: `Product is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Product` });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await ProductInventoryApp.find();
    res.json({ message: `Product is Fetched Successfully`, Product: products });
  } catch (err) {
    res.json({ error: `Unable to Fetch Product` });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const lowStock = quantity <= 5;

    const products = await ProductInventoryApp.findByIdAndUpdate(
      id,
      { name, quantity, price, lowStock },
      { new: true }
    );

    if (lowStock)
      return res.json({
        message: `Product is Succesfully Updated but Stock is Low`,
      });

    if (!products) return res.json({ error: `Product not Found` });
    res.json({ message: `Product is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Product` });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const products = await ProductInventoryApp.findByIdAndDelete(id);

    if (!products) return res.json({ error: `Product not Found` });

    res.json({ message: `Product is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Product` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
