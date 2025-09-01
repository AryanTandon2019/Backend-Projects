'use strict';

import express from 'express';
import { NotesApp } from './db.js';

const app = express();
app.use(express.json());

app.post('/notes', async (req, res) => {
  try {
    const { title, content, tag } = req.body;

    if (title === '') return res.json({ error: `Title is Not found` });
    else if (content === '') return res.json({ error: `Content is Not found` });
    else if (tag === '') return res.json({ error: `Tag is Not found` });

    await NotesApp.create({
      title,
      content,
      tag,
    });

    res.json({ message: `Note is Successfully Created 😜` });
  } catch (err) {
    res.json({ message: `Failed to Created Note 😭` });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await NotesApp.find();
    res.json(notes);
  } catch (err) {
    res.json({ error: `Notes is Not found` });
  }
});

app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tag } = req.body;
    await NotesApp.findByIdAndUpdate(
      id,
      { title, content, tag },
      { new: true }
    );
    res.json({ message: `Note is Successfully Updated` });
  } catch (err) {
    res.json({ error: `Unable to Update Note` });
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await NotesApp.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.json({ error: 'Note not Found' });
    }
    res.json({ message: `Your Note is Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Note` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
