import express from 'express';
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks
} from '../controllers/bookController.js';

import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET - All users can see all books
router.get('/', verifyToken, getAllBooks);

// POST - Only admin can add
router.post('/', verifyToken, isAdmin, createBook);

// PUT - Only admin can update
router.put('/:id', verifyToken, isAdmin, updateBook);

// DELETE - Only admin can delete
router.delete('/:id', verifyToken, isAdmin, deleteBook);

export default router;
