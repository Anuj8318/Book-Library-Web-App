import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import borrowRoutes from './routes/borrow.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// all api routes 
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', borrowRoutes);


app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'DB error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
