'use strict';

import express from 'express';
import { CommentSystemApp } from './db.js';

const app = express();

app.use(express.json());

app.post('/comments', async (req, res) => {
  try {
    const { userName, commentText, postId } = req.body;

    if (userName === '') return res.json({ error: `Username field is Empty` });
    else if (commentText === '')
      return res.json({ error: `Comment Field is Empty` });
    else if (postId === '')
      return res.json({ error: `Post Id Field is Empty` });

    await CommentSystemApp.create({ userName, commentText, postId });

    res.json({ message: `Comment is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Comment` });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comment = await CommentSystemApp.find();

    res.json({ message: `Comment is Fetched Successfully`, comments: comment });
  } catch (err) {
    res.json({ error: `Unable to Fetched Comments` });
  }
});

app.put('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, commentText, postId } = req.body;

    const comment = await CommentSystemApp.findByIdAndUpdate(
      id,
      { userName, commentText, postId },
      { new: true }
    );

    if (!comment) return res.json({ error: `Comment not Found` });

    res.json({ message: `Comment is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Comment` });
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await CommentSystemApp.findByIdAndDelete(id);

    if (!comment) return res.json({ error: `Comment not Found` });

    res.json({ message: `Comment is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Comment` });
  }
});

app.listen(3000, () => {
  console.log(`Your Server is Running at 3000`);
});
