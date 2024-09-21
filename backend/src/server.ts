import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json('Hello, TypeScript with Express!');
});

// Routes
import authRoutes from './routes/auth/authrouter.js';
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
