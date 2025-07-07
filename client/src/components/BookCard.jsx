import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";

const BookCard = ({ book, onEdit, onDelete, isUser = false }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  // Early return if book is not provided
  if (!book || !book.id) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
        <div className="animate-pulse">
          <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        </div>
      </div>
    );
  }

  // Get current user info
  const getCurrentUser = () => {
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setCurrentUser({
      id: payload.id || payload.userId,
      username: payload.username || payload.name || 'User',
      email: payload.email,
      role: payload.role || 'user'
    });
    console.log('User info from token:', payload);
  } catch (err) {
    console.error("Failed to parse token:", err);
  }
};


  const fetchReviews = async () => {
    if (!book?.id) return;
    
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${book.id}`);
      setReviews(res.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error("Failed to load reviews");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with:', { rating, comment, bookId: book?.id });
    
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    if (!book?.id) {
      toast.error("Book information is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        rating: Number(rating),
        comment: comment.trim(),
        book_id: book.id
      };

      console.log('Sending review data:', reviewData);

      // Try different possible endpoints
      const possibleEndpoints = [
        `http://localhost:5000/api/reviews/${book.id}`,
        `http://localhost:5000/api/review/${book.id}`,
        `http://localhost:5000/api/books/${book.id}/reviews`,
        `http://localhost:5000/api/reviews`
      ];

      let success = false;
      
      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          
          const response = await axios.post(
            endpoint,
            reviewData,
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          
          console.log('Review submitted successfully:', response.data);
          toast.success("Review submitted successfully!");
          setRating(0);
          setComment("");
          await fetchReviews();
          success = true;
          break;
        } catch (err) {
          console.log(`Endpoint ${endpoint} failed:`, err.response?.data || err.message);
          continue;
        }
      }
      
      if (!success) {
        throw new Error('All review endpoints failed');
      }
      
    } catch (err) {
      console.error('Error submitting review:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message ||
                          "Error submitting review";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (book?.id) {
      fetchReviews();
      if (isUser) {
        getCurrentUser();
      }
    }
  }, [book?.id, isUser]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "N/A";

  const resolvedCoverUrl = book?.cover_url
    ? book.cover_url.startsWith("http")
      ? book.cover_url
      : `http://localhost:5000/${book.cover_url.replace(/^\/+/, "")}`
    : "https://placehold.co/150x200?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
      {/* Book Cover */}
      <div className="mb-4">
        <img
          src={resolvedCoverUrl}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "https://placehold.co/150x200?text=No+Image";
          }}
        />
      </div>

      {/* Book Info */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{book?.title || 'Unknown Title'}</h3>
        <p className="text-gray-600 mb-1">by {book?.author || 'Unknown Author'}</p>
        <p className="text-sm text-gray-500 mb-2">Genre: {book?.genre || 'Unknown'}</p>
        <p className="text-sm text-gray-600 mb-3">
          Available: {book?.available_copies || 0}/{book?.total_copies || 0}
        </p>

        {/* Average Rating */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-2">⭐</span>
          <span className="text-sm font-medium">
            {avgRating === "N/A" ? "No ratings yet" : `${avgRating} (${reviews.length} reviews)`}
          </span>
        </div>

        {/* Reviews Section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Reviews</h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      by {review.username || review.user_name || review.name || 'Anonymous'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                  {review.created_at && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Review Form for Users */}
        {isUser && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Write a Review</h4>
            
            {/* Show login status */}
            {!token && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  Please log in to write a review.
                </p>
              </div>
            )}
            
            {token && !currentUser && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  Loading your profile...
                </p>
              </div>
            )}
            
            {token && currentUser && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  Writing as: {currentUser.username || currentUser.name || 'User'}
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Rating *</label>
                <StarRatings
                  rating={rating}
                  starRatedColor="#f59e0b"
                  starHoverColor="#f59e0b"
                  changeRating={setRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="3px"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current rating: {rating}/5
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Review *</label>
                <textarea
                  placeholder="Share your thoughts about this book..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  required
                  maxLength={500}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {comment.length}/500 characters
                </p>
              </div>
              
              {/* Debug info */}
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <p>Debug: Book ID: {book?.id}</p>
                <p>Token: {token ? 'Present' : 'Missing'}</p>
                <p>User: {currentUser ? 'Loaded' : 'Not loaded'}</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || rating === 0 || !comment.trim() || !token}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isSubmitting || rating === 0 || !comment.trim() || !token
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Admin Buttons */}
        {!isUser && (
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => onEdit(book)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;