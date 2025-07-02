import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(`http://localhost:5000/api/borrow/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book borrowed!');
      fetchBooks();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author} — {book.available_copies} available
            {book.available_copies > 0 && (
              <button onClick={() => handleBorrow(book.id)}>Borrow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
