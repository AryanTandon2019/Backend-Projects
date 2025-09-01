'use strict';

import express from 'express';
import { BlogApiApp } from './db.js';

const app = express();
app.use(express.json());

app.post('/blogs', async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    if (title === '') return res.json({ error: `Title is not Found` });
    else if (content === '') return res.json({ error: `Content is not Found` });
    else if (author === '') return res.json({ error: `Author is not Found` });

    await BlogApiApp.create({ title, content, author, category });

    res.json({ message: `Blog is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Blog` });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blog = await BlogApiApp.find();

    res.json({ message: `Blog is Fetched Successfully`, blog });
  } catch (err) {
    res.json({ error: `Unable to Fetch Blog` });
  }
});

app.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, category } = req.body;

    const blog = await BlogApiApp.findByIdAndUpdate(
      id,
      { title, content, author, category },
      { new: true }
    );

    if (!blog) return res.json({ error: `Blo  g not Found` });

    res.json({ message: `Blog is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Blog`, blog });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogApiApp.findByIdAndDelete(id);

    if (!blog) return res.json({ error: `Blog not Found` });

    res.json({ message: `Blog is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Blog` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
