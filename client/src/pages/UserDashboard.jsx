import { useEffect, useState } from "react";
import { getBooks, borrowBook } from "../api/book";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch {
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = books;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre) {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "available":
          return b.available_copies - a.available_copies;
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedGenre, sortBy]);

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id);
      toast.success("Book borrowed successfully!");
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Borrow failed");
    }
  };

  // Get unique genres for filter dropdown
  const genres = [...new Set(books.map((book) => book.genre))].filter(Boolean);

  // Enhanced BookCard component with borrow functionality
  const EnhancedBookCard = ({ book }) => {
    if (!book || !book.id) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <BookCard book={book} isUser={true} />
        
        {/* Borrow Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => handleBorrow(book.id)}
            disabled={book.available_copies <= 0}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              book.available_copies <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
            }`}
          >
            {book.available_copies > 0 ? "Borrow Book" : "Not Available"}
          </button>
        </div>
      </div>
    );
  };

  // List view component
  const BookListItem = ({ book }) => {
    if (!book || !book.id) {
      return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-30 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center space-x-4">
        <img
          src={book.cover_url || "https://placehold.co/80x120?text=No+Image"}
          alt={book.title}
          className="w-20 h-30 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-500">Genre: {book.genre}</p>
          <p className="text-sm text-gray-600">
            Available: {book.available_copies}/{book.total_copies}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className="text-yellow-500 text-sm">⭐ Rating available</span>
          <button
            onClick={() => handleBorrow(book.id)}
            disabled={book.available_copies <= 0}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              book.available_copies <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {book.available_copies > 0 ? "Borrow" : "Unavailable"}
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Library Dashboard
          </h1>
          <p className="text-gray-600">
            Discover, review, and borrow books from our collection
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="available">Availability</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                List
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {filteredBooks.length} of {books.length} books
            </div>
          </div>
        </div>

        {/* Books Display */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.filter(book => book && book.id).map((book) => (
              <EnhancedBookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.filter(book => book && book.id).map((book) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;