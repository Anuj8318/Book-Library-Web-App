import { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../api/book";
import axios from "../api/axios";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    total_copies: "",
    cover_url: "",
  });
  const [editId, setEditId] = useState(null);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to fetch books");
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      toast.error("Failed to fetch analytics");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateBook(editId, form);
        toast.success("Book updated successfully!");
      } else {
        await addBook(form);
        toast.success("Book added successfully!");
      }
      setForm({ title: "", author: "", genre: "", total_copies: "",cover_url: "", });
      setEditId(null);
      setShowForm(false);
      fetchBooks();
    } catch (err) {
      toast.error("Error saving book.");
    }
  };
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("cover", file); // must match multer field name

  const token = localStorage.getItem("token");

  try {
    const res = await axios.post("http://localhost:5000/api/books/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    });

    const { filePath } = res.data;
    console.log("Uploaded cover URL:", filePath);
    setForm({ ...form, cover_url: filePath }); // set cover_url in DB
    toast.success("Cover uploaded!");
  } catch (err) {
    console.error(err);
    toast.error("Upload failed");
  }
};


  const handleEdit = (book) => {
    setForm(book);
    setEditId(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch {
      toast.error("Failed to delete book.");
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setForm({ title: "", author: "", genre: "", total_copies: "" });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full shadow-lg mb-4">
              <span className="text-2xl mr-2">👑</span>
              <span className="font-semibold">Admin Dashboard</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Library <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Control Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your library with powerful analytics and intuitive controls
            </p>
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard 
                label="📚 Total Books" 
                value={stats.totalBooks} 
                color="from-blue-500 to-blue-600"
                bgColor="from-blue-50 to-blue-100"
                trend="+12% this month"
              />
              <StatCard 
                label="📖 Borrowed" 
                value={stats.totalBorrowed} 
                color="from-yellow-500 to-yellow-600"
                bgColor="from-yellow-50 to-yellow-100"
                trend="+8% this week"
              />
              <StatCard 
                label="⏰ Overdue" 
                value={stats.overdueCount} 
                color="from-red-500 to-red-600"
                bgColor="from-red-50 to-red-100"
                trend="-3% this week"
              />
              <StatCard 
                label="👤 Active Users" 
                value={stats.activeUsers} 
                color="from-green-500 to-green-600"
                bgColor="from-green-50 to-green-100"
                trend="+15% this month"
              />
            </div>
          )}

          {/* Charts Section */}
          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">📈 Weekly Borrow Trend</h2>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Last 7 days
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.borrowTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="week" tick={{ fill: '#64748b' }} />
                    <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="url(#colorGradient)" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">📚 Top Borrowed Books</h2>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.topBooks}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="title" tick={{ fill: '#64748b' }} />
                    <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              {showForm ? '✕ Cancel' : '+ Add New Book'}
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Add/Edit Book Form */}
          {showForm && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto mb-12 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {editId ? "✏️ Edit Book" : "📚 Add New Book"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
                    <input
                      type="text"
                      placeholder="Enter book title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      placeholder="Enter author name"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                    <input
                      type="text"
                      placeholder="Enter genre"
                      value={form.genre}
                      onChange={(e) => setForm({ ...form, genre: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Copies</label>
                    <input
                      type="number"
                      placeholder="Enter number of copies"
                      value={form.total_copies}
                      onChange={(e) => setForm({ ...form, total_copies: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">Book Cover</label>

  {/* Input for cover URL */}
  <input
    type="text"
    placeholder="Cover Image URL"
    name="cover_url"
    value={form.cover_url || ""}
    onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
  />

  {/* File Upload */}
  <input
    type="file"
    accept="image/*"
    onChange={handleFileUpload}
    className="w-full border px-4 py-2 rounded mb-2"
  />

  {/* Image Preview */}
  {form.cover_url && (
    <img
      src={
        form.cover_url.startsWith("http")
          ? form.cover_url
          : `http://localhost:5000${form.cover_url}`
      }
      alt="Book Cover Preview"
      className="h-32 mt-2 rounded border object-contain"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/150";
      }}
    />
  )}
</div>


                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    {editId ? "💾 Update Book" : "📚 Add Book"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Books Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                📖 Library Collection
              </h2>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <span className="text-sm font-medium text-gray-600">
                  {filteredBooks.length} books found
                </span>
              </div>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <div key={book.id} className="transform hover:scale-105 transition-all duration-200">
                  <BookCard
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No books found</h3>
                <p className="text-gray-500">Try adjusting your search terms or add a new book</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, bgColor, trend }) => (
  <div className={`bg-gradient-to-br ${bgColor} rounded-2xl shadow-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
        {label.charAt(0)}
      </div>
      <div className="text-right">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{label.substring(2)}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-xs text-gray-500">{trend}</div>
      <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
    </div>
  </div>
);

export default AdminDashboard;