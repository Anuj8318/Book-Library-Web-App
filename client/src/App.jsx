
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import BorrowedBooks from './pages/BorrowedBooks';
import Navbar from './components/Navbar';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboards */}
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/borrowed"
          element={user?.role === 'user' ? <BorrowedBooks /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
