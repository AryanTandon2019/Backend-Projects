'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import { UserAuthSystem } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username === '') return res.json({ error: `Username field is Empty` });
    else if (email === '') return res.json({ error: `Email field is Empty` });
    else if (password === '')
      return res.json({ error: `Password field is Empty` });

    const existingUser = await UserAuthSystem.findOne({ email });

    if (existingUser)
      return res.json({ error: `User of this Email already Exist` });

    const hashedPass = await bcrypt.hash(password, 10);

    await UserAuthSystem.create({
      username,
      email,
      password: hashedPass,
    });

    res.json({ message: `User Register Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Register User` });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === '') return res.json({ error: `Email Field is Missing` });
    else if (password === '')
      return res.json({ error: `Password Field is Missing` });

    const existingUser = await UserAuthSystem.findOne({ email });

    if (!existingUser) return res.json({ error: `User not Exist` });

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) return res.json({ error: `Invalid Credentials` });

    res.json({ message: `User Logged in Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Logged User` });
  }
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
