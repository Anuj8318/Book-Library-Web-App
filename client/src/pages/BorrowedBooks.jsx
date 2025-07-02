import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowedBooks = () => {
  const [borrowed, setBorrowed] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBorrowedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/borrowed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowed(res.data);
    } catch (err) {
      alert("Failed to fetch borrowed books");
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const returnBook = async (bookId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/return/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book returned!");
      fetchBorrowedBooks();
    } catch (err) {
      alert("Failed to return book");
    }
  };

  return (
    <div>
      <h2>My Borrowed Books</h2>
      {borrowed.length === 0 ? (
        <p>No books borrowed yet.</p>
      ) : (
        <ul>
          {borrowed.map((book) => (
            <li key={book.id}>
              <b>{book.title}</b> by {book.author} — Borrowed on{" "}
              {new Date(book.borrow_date).toLocaleDateString()}
              <button onClick={() => returnBook(book.book_id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowedBooks;
