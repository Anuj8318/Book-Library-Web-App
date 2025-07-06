import pool from '../config/db.js';

//  GET all books with availability
export const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, 
        COUNT(bb.id) FILTER (WHERE bb.return_date IS NULL) AS borrowed_count,
        (b.total_copies - COUNT(bb.id) FILTER (WHERE bb.return_date IS NULL)) AS available_copies
      FROM books b
      LEFT JOIN borrowed_books bb ON bb.book_id = b.id
      GROUP BY b.id
      ORDER BY b.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

//  POST - Add a book
export const createBook = async (req, res) => {
  const { title, author, genre, total_copies,cover_url } = req.body;

  if (!title || !author|| !genre || !total_copies) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, genre, total_copies, cover_url)
       VALUES ($1, $2, $3, $4,$5) RETURNING *`,
      [title, author, genre, total_copies,cover_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding book' });
  }
};

//  PUT - Update a book
export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre, total_copies, cover_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, genre = $3, total_copies = $4, cover_url = $5
       WHERE id = $6 RETURNING *`,
      [title, author, genre, total_copies, cover_url, bookId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating book' });
  }
};

//  DELETE - Remove a book
export const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting book' });
  }
};

export const uploadBookCover = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
};
