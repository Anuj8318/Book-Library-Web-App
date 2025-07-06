import { useEffect, useState } from "react";
import { getBorrowedBooks, returnBook } from "../api/book";
import { toast } from "react-toastify";

const BorrowedBooks = () => {
  const [borrowed, setBorrowed] = useState([]);

  const fetchBorrowed = async () => {
    try {
      const res = await getBorrowedBooks();
      setBorrowed(res.data);
    } catch {
      toast.error("Failed to load borrowed books.");
    }
  };

  const handleReturn = async (bookId) => {
  try {
    await returnBook(bookId);
    toast.success("Book returned successfully!");
    fetchBorrowed(); // refresh list
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to return book.");
  }
};

  useEffect(() => {
    fetchBorrowed();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Your Borrowed Books</h1>
      <div className="grid gap-4">
        {borrowed.length === 0 ? (
          <p className="text-gray-600">No books borrowed.</p>
        ) : (
          borrowed.map((book) => (
            <div key={book.book_id} className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h2 className="font-bold">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
              </div>
              <button
                onClick={() => handleReturn(book.book_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Return
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
