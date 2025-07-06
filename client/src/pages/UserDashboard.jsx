import { useEffect, useState } from "react";
import { getBooks, borrowBook } from "../api/book";
import { toast } from "react-toastify";


const UserDashboard = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch {
      toast.error("Failed to load books.");
    }
  };



  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id);
      toast.success("Book borrowed!");
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Borrow failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Browse & Borrow Books</h1>
       

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-md p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-500">{book.author}</p>
              <p className="text-sm text-gray-600">Available: {book.available_copies}</p>
            </div>
            <button
              onClick={() => handleBorrow(book.id)}
              disabled={book.available_copies <= 0}
              className={`mt-4 py-2 px-4 rounded ${
                book.available_copies <= 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {book.available_copies > 0 ? "Borrow" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
