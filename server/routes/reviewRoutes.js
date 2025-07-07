import express from "express";
import {
  addReview,
  getReviewsByBook,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a review
router.post("/:bookId", verifyToken, addReview);

// Get reviews by book ID
router.get("/:bookId", getReviewsByBook);  // ✅ This must exist

// Update and delete (optional)
router.put("/:reviewId", verifyToken, updateReview);
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
