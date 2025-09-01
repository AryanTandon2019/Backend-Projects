'use strict';

import express from 'express';
import { CalculatorApp } from './db.js';
import { error } from 'console';

const app = express();

app.use(express.json());

app.post('/calculator', async (req, res) => {
  const { a, b, op } = req.body;

  const num1 = Number(a);
  const num2 = Number(b);
  let result;

  if (op === '+') result = num1 + num2;
  else if (op === '-') result = num1 - num2;
  else if (op === '*') result = num1 * num2;
  else if (op === '/') {
    if (num2 === 0) return res.json({ error: `Denominator can't be 0` });
    result = num1 / num2;
  } else return res.json({ error: `Invalid Operator` });

  await CalculatorApp.create({ a: num1, b: num2, op, result });

  res.json({ result });
});

app.listen(3000, () => {
  console.log(`Server is Running at Port 3000`);
});
