// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Store token + user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect based on role
      res.data.user.role === 'admin' ? navigate('/admin') : navigate('/user');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
