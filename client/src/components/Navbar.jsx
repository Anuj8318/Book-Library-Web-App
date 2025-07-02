// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav>
      {user && (
        <>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          {user.role === 'user' && (
            <>
              <Link to="/user">Books</Link>
              <Link to="/user/borrowed">My Borrowed</Link>
            </>
          )}
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
