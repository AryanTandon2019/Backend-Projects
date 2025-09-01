'use strict';

import express from 'express';
import { JobBoardApp } from './db.js';
import { error } from 'console';

const app = express();
app.use(express.json());

app.post('/jobs', async (req, res) => {
  try {
    const { title, company, location, jobType, salary, description } = req.body;

    if (title === '') return res.json({ error: `Title field is Empty` });
    else if (company === '')
      return res.json({ error: `Company field is Empty` });
    else if (location === '')
      return res.json({ error: `Location field is Empty` });
    else if (jobType === '')
      return res.json({ error: `JobType field is Empty` });
    else if (salary === '') return res.json({ error: `Salary field is Empty` });
    else if (description === '')
      return res.json({ error: `Description field is Empty` });

    await JobBoardApp.create({
      title,
      company,
      location,
      jobType,
      salary,
      description,
    });

    res.json({ message: `Job is Created Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Create Job` });
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const job = await JobBoardApp.find();

    res.json({ message: `Job is Fetched Successfully`, job });
  } catch (err) {
    res.json({ error: `Unable to Fetch Job` });
  }
});

app.put('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, jobType, salary, description } = req.body;

    const job = await JobBoardApp.findByIdAndUpdate(
      id,
      { title, company, location, jobType, salary, description },
      { new: true }
    );

    if (!job) return res.json({ error: `Job not Found` });

    res.json({ message: `Job is Updated Successfully` });
  } catch (err) {
    res.json({ error: `Unable to Update Job` });
  }
});

app.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params;

  const job = JobBoardApp.findByIdAndDelete(id);

  if (!job) return res.json({ error: `Job not Found` });

  res.json({ message: `Job is Updated Successfully` });
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
