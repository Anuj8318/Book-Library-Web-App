const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      {/* Book Cover */}
      {book.cover_url && (
        <img
          src={
            book.cover_url.startsWith("http")
              ? book.cover_url
              : `http://localhost:5000/${book.cover_url.replace(/^\/+/, "")}`
          }
          alt={book.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}

      {/* Book Info */}
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">Genre: {book.genre}</p>
      <p className="text-sm text-gray-600 mt-2">
        Copies: {book.available_copies}/{book.total_copies}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => onEdit(book)}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
