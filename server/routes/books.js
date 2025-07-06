import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  uploadBookCover
} from "../controllers/bookController.js";

import upload from '../middlewares/uploadMiddleware.js'; // ✅ Corrected import
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET - All users can see all books
router.get("/", verifyToken, getAllBooks);

// POST - Only admin can add
router.post("/", verifyToken, isAdmin, createBook);

// PUT - Only admin can update
router.put("/:id", verifyToken, isAdmin, updateBook);

// DELETE - Only admin can delete
router.delete("/:id", verifyToken, isAdmin, deleteBook);

// ✅ File Upload Route
router.post("/upload", verifyToken, isAdmin, upload.single("cover"), uploadBookCover);

export default router;
