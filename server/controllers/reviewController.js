import pool from "../config/db.js";

// Add review
export const addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const existing = await pool.query("SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2", [userId, bookId]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "You already reviewed this book." });
    }

    const result = await pool.query(
      "INSERT INTO reviews (book_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [bookId, userId, rating, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for a book
export const getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.*, u.name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.book_id = $1 
       ORDER BY r.created_at DESC`,
      [bookId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err); // Add this to see the actual issue
    res.status(500).json({ message: "Error fetching reviews" });
  }
};


// Update review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const check = await pool.query("SELECT * FROM reviews WHERE id = $1 AND user_id = $2", [reviewId, userId]);
    if (check.rows.length === 0) return res.status(403).json({ message: "Unauthorized" });

    const result = await pool.query(
      `UPDATE reviews SET rating = $1, comment = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [rating, comment, reviewId]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const check = await pool.query("SELECT * FROM reviews WHERE id = $1 AND user_id = $2", [reviewId, userId]);
    if (check.rows.length === 0) return res.status(403).json({ message: "Unauthorized" });

    await pool.query("DELETE FROM reviews WHERE id = $1", [reviewId]);
    res.json({ message: "Review deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
