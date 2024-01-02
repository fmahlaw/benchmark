/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import finderRoute from './route/finderRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost'

// JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cors())

// Home route
app.get('/home', (req, res) => {
  res.send("Home")
});

// Route for finder
app.use('/find-part', finderRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
