'use strict';

import express from 'express';
import { FeedbackCollectorApp } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/feedbacks', async (req, res) => {
  try {
    const { name, feedback, rating, isAnonymous } = req.body;

    if (!feedback) return res.json({ error: `Feedack is Required` });
    if (!rating) return res.json({ error: `Rating is Required` });

    let finalName;
    if (isAnonymous === true) {
      finalName = `Anonymous`;
    } else {
      if (!name) {
        return res.json({ error: `Name is Required is Not Anonymous` });
      } else {
        finalName = name;
      }
    }

    if (rating > 5 || rating < 1) {
      return res.json({ error: `Rating must be btw 1 to 5` });
    }

    await FeedbackCollectorApp.create({
      name: finalName,
      feedback,
      rating,
      isAnonymous,
    });

    res.json({ message: `Feedback Logged Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Log Feedback` });
  }
});

app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await FeedbackCollectorApp.find();

    res.json({
      message: `Feedback is Fetched Successfully`,
      Feedback: feedbacks,
    });
  } catch (err) {
    res.json({ error: `Unable to Fetch Feedback` });
  }
});

app.put('/feedbacks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, feedback, rating, isAnonymous } = req.body;

    let finalName;

    if (isAnonymous === true) {
      finalName = `Anonymous`;
    } else {
      if (name) {
        finalName = name;
      } else {
        return res.json({ error: `Name is Required is Not Anonymous` });
      }
    }

    if (rating > 5 || rating < 1) {
      return res.json({ message: `Rating must be btw 1 to 5` });
    }

    const feedbacks = await FeedbackCollectorApp.findByIdAndUpdate(
      id,
      { name, feedback, rating, isAnonymous },
      { new: true }
    );

    if (!feedbacks) return res.json({ error: `Feedback not Found` });

    res.json({ message: `Feedback is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Feedback` });
  }
});

app.delete('/feedbacks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const feedbacks = await FeedbackCollectorApp.findByIdAndDelete(id);

    if (!feedbacks) return res.json({ error: `Feedback not Found` });

    res.json({ message: `Feedback is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Feedback` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
