import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./router/ProtectedRoute";
import BorrowedBooks from "./pages/BorrowedBooks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrowed"
          element={
            <ProtectedRoute role="user">
              <BorrowedBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<p className="p-8 text-center">Page not found.</p>}
        />
      </Routes>
    </>
  );
}

export default App;
