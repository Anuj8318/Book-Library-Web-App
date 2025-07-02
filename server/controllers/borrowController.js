import pool from '../config/db.js';

// 🔁 Borrow a book
export const borrowBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user.id;

  try {
    // Check if user already borrowed and not returned
    const check = await pool.query(
      `SELECT * FROM borrowed_books
       WHERE user_id = $1 AND book_id = $2 AND return_date IS NULL`,
      [userId, bookId]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'You already borrowed this book' });
    }

    // Check availability
    const available = await pool.query(
      `SELECT total_copies - COUNT(bb.id) AS available
       FROM books b
       LEFT JOIN borrowed_books bb ON bb.book_id = b.id AND bb.return_date IS NULL
       WHERE b.id = $1
       GROUP BY b.total_copies`,
      [bookId]
    );

    if (!available.rows[0] || available.rows[0].available <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Insert borrow record
    await pool.query(
      `INSERT INTO borrowed_books (user_id, book_id)
       VALUES ($1, $2)`,
      [userId, bookId]
    );

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Borrow failed' });
  }
};

// 🔁 Return a book
export const returnBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE borrowed_books
       SET return_date = NOW()
       WHERE user_id = $1 AND book_id = $2 AND return_date IS NULL
       RETURNING *`,
      [userId, bookId]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'No borrowed book found to return' });
    }

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Return failed' });
  }
};

// 📚 Get all currently borrowed books by user
export const getBorrowedBooks = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT bb.id,bb.book_id, b.title, b.author, bb.borrow_date
       FROM borrowed_books bb
       JOIN books b ON b.id = bb.book_id
       WHERE bb.user_id = $1 AND bb.return_date IS NULL
       ORDER BY bb.borrow_date DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch borrowed books' });
  }
};
