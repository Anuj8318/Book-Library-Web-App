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
      <div className="logo">
        <Link to={user?.role === 'admin' ? '/admin' : '/user'}>
          <strong>📚 MyLibrary</strong>
        </Link>
      </div>

      <div className="nav-links">
        {user && (
          <>
            {user.role === 'admin' && <Link to="/admin">Dashboard</Link>}
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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
