import express from 'express';
import {
  borrowBook,
  returnBook,
  getBorrowedBooks
} from '../controllers/borrowController.js';

import { verifyToken, isUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/borrow/:bookId', verifyToken, isUser, borrowBook);
router.post('/return/:bookId', verifyToken, isUser, returnBook);
router.get('/borrowed', verifyToken, isUser, getBorrowedBooks);

export default router;
