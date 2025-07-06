import pool from '../config/db.js';

export const getAdminStats = async (req, res) => {
  try {
    // Total books
    const totalBooksRes = await pool.query('SELECT COUNT(*) FROM books');
    const totalBooks = parseInt(totalBooksRes.rows[0].count);

    // Total borrowed (currently active)
    const totalBorrowedRes = await pool.query(
      'SELECT COUNT(*) FROM borrowed_books WHERE return_date IS NULL'
    );
    const totalBorrowed = parseInt(totalBorrowedRes.rows[0].count);

    // Overdue (more than 14 days ago, not returned)
    const overdueRes = await pool.query(`
      SELECT COUNT(*) FROM borrowed_books
      WHERE return_date IS NULL AND borrow_date < NOW() - INTERVAL '14 days'
    `);
    const overdueCount = parseInt(overdueRes.rows[0].count);

    // Active users in last 30 days
    const activeUsersRes = await pool.query(`
      SELECT COUNT(DISTINCT user_id) FROM borrowed_books
      WHERE borrow_date >= NOW() - INTERVAL '30 days'
    `);
    const activeUsers = parseInt(activeUsersRes.rows[0].count);

    // Weekly borrow trend (past 6 weeks)
    const trendRes = await pool.query(`
      SELECT
        TO_CHAR(borrow_date, 'IYYY-"W"IW') AS week,
        COUNT(*) as count
      FROM borrowed_books
      WHERE borrow_date >= NOW() - INTERVAL '6 weeks'
      GROUP BY week
      ORDER BY week ASC
    `);
    const borrowTrend = trendRes.rows.map((row) => ({
      week: row.week,
      count: parseInt(row.count),
    }));

    // Top 5 most borrowed books
    const topBooksRes = await pool.query(`
      SELECT b.title, COUNT(bb.id) as count
      FROM borrowed_books bb
      JOIN books b ON b.id = bb.book_id
      GROUP BY b.title
      ORDER BY count DESC
      LIMIT 5
    `);
    const topBooks = topBooksRes.rows.map((row) => ({
      title: row.title,
      count: parseInt(row.count),
    }));

    // Send response
    res.json({
      totalBooks,
      totalBorrowed,
      overdueCount,
      activeUsers,
      borrowTrend,
      topBooks,
    });

  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};
