import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', total_copies: '' });
  const [editId, setEditId] = useState(null);

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/api/books/${editId}`
      : `http://localhost:5000/api/books`;

    const method = editId ? 'put' : 'post';

    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', author: '', genre: '', total_copies: '' });
      setEditId(null);
      fetchBooks();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      total_copies: book.total_copies
    });
    setEditId(book.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBooks();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <input
          name="total_copies"
          type="number"
          value={form.total_copies}
          onChange={handleChange}
          placeholder="Total Copies"
          required
        />
        <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
      </form>

      <hr />

      <h3>Book List</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author} — {book.available_copies}/{book.total_copies} available
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
