'use strict';

import express from 'express';
import { MovieTrackerApp } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/movies', async (req, res) => {
  try {
    const { title, genre, rating, watched } = req.body;

    if (title === '') return res.json({ error: `Title not Found` });
    else if (genre === '') return res.json({ error: `Genre not Found` });
    else if (rating === '') return res.json({ error: `Rating not Found` });
    else if (typeof watched !== 'boolean')
      return res.json({ error: `Watched not Found` });

    const movieApp = await MovieTrackerApp.create({
      title,
      genre,
      rating,
      watched,
    });

    res.json({ message: `Movie Successfully Logged` });
  } catch (err) {
    res.json({ error: `Movie Can't be Logged` });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movieApp = await MovieTrackerApp.find();
    res.json({ message: `Movie Successfully Fetched`, movies: movieApp });
  } catch (err) {
    res.json({ error: `Movie can't be Fetched` });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, rating, watched } = req.body;

    const movieApp = await MovieTrackerApp.findByIdAndUpdate(
      id,
      { title, genre, rating, watched },
      { new: true }
    );

    if (!movieApp) return res.json({ error: `Movie not Found` });

    res.json({ message: `Movie is Successfully Updated` });
  } catch (err) {
    res.json({ error: `Movie is not Updated` });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const movieApp = await MovieTrackerApp.findByIdAndDelete(id);

    if (!movieApp) return res.json({ error: `Movie not Found` });

    res.json({ message: `Movie Successfully Deleted` });
  } catch (err) {
    res.json({ error: `Movie is not Deleted` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Runnign at Port 3000`);
});
