'use strict';

import express from 'express';
import { ContactBookApp } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (name === '') return res.json({ error: `Name is not Found` });
    else if (email === '') return res.json({ error: `Email is not Found` });
    else if (phone === '') return res.json({ error: `Phone No. Not found ` });

    await ContactBookApp.create({
      name,
      email,
      phone,
    });

    res.json({ message: `Contact Successfully Created` });
  } catch (err) {
    res.json({ error: `Unable to Create ContactBook` });
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await ContactBookApp.find();

    res.json(contacts);
  } catch (err) {
    res.json({ error: `Unable to Fetch Contacts` });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updatedContact = await ContactBookApp.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    if (!updatedContact) {
      return res.json({ error: 'Contact not found' });
    }

    res.json({ message: `Contact Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Contacts` });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await ContactBookApp.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.json({ error: `Contact not Found` });
    }

    res.json({ message: `Contact Deleted Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Delete Contact` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
