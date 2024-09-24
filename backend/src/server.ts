import express, { NextFunction, Request, Response } from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import errorHandler, { notFound } from './middleware/errorMIddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes

// Database
connectDB();

// Root Route
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.json('Chat Box is on Developing Mode 💻');

  } else {
    res.json('Chat Box is Online :)');
  }
});

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
