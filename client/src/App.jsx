import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import BorrowedBooks from './pages/BorrowedBooks';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? "/admin" : "/user") : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based routes */}
        <Route
          path="/admin"
          element={
            user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/user"
          element={
            user && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/user/borrowed"
          element={
            user && user.role === 'user' ? <BorrowedBooks /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
