import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import errorHandler, { notFound } from './middleware/errorMIddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended : true}));

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
