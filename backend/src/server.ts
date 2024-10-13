import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler, { notFound } from './middleware/errorMIddleware';
import http from 'http';
import setupSocket from './sockets/socket';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

// Routes

// Database
connectDB();

const httpServer = http.createServer(app);
setupSocket(httpServer);

// Root Route
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';

app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.json('Connect is on Developing Mode 💻');

  } else {
    res.json('Connect is Online :)');
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.use(notFound);
app.use(errorHandler);

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
