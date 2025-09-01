'use strict';

import express from 'express';
import { EventPlannerApp } from './db.js';
import { error } from 'console';
const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  try {
    const { title, description, eventDateTime, location, isRSVP } = req.body;

    if (title === '') return res.json({ error: `Title field is Empty` });
    else if (description === '')
      return res.json({ error: `Description field is Empty` });
    else if (location === '')
      return res.json({ error: `Location field is Empty` });

    await EventPlannerApp.create({
      title,
      description,
      eventDateTime,
      location,
      isRSVP,
    });

    res.json({ message: `Event is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Event` });
  }
});

app.get('/events', async (req, res) => {
  try {
    const event = await EventPlannerApp.find();

    res.json({ message: `Event is Fetched Succesfully`, event });
  } catch (err) {
    res.json({ error: `Unable to Fetch Event` });
  }
});

app.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDateTime, location, isRSVP } = req.body;

    if (!title || !description || !location) {
      return res.json({ error: `Please fill all required fields.` });
    }

    const event = await EventPlannerApp.findByIdAndUpdate(
      id,
      { title, description, eventDateTime, location, isRSVP },
      { new: true }
    );

    if (!event) return res.json({ error: `Event not Found` });

    res.json({ message: `Event is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Event` });
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventPlannerApp.findByIdAndDelete(id);

    if (!event) return res.json({ error: `Event not Found` });

    res.json({ message: `Event is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Event` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Runnig at Port 3000`);
});
