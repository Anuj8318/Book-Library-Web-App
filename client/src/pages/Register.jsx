// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={registerHandler}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <br />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
