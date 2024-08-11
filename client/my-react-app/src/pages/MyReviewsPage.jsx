import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-lg text-black">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="text-lg">AutoSavy</div>
          </Link>
          <div className="flex gap-4 text-sm">
            <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
            <Link to="/dashboard" className="text-black hover:text-gray-700">Dashboard</Link>
            <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
            <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
            <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
          </div>
        </nav>
      </header>
    );
  };

  const ReviewCard = ({ review }) => (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">{review.title}</h2>
      <p className="text-gray-700">{review.body}</p>
      <p className="text-gray-500 text-sm">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
    </div>
  );

  const MyReviewsPage = () => {
    const { authToken, userId } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReviews = async () => {
            if (!userId || !authToken) {
                console.error('User is undefined or has no ID');
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:5000/reviews/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchReviews();
    }, [authToken, userId]);
    
    if (loading) {
        return (
            <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-gray-100">
            <Header />
            <div className="pt-24 p-6">
                <h1 className="text-2xl font-semibold mb-4">My Reviews</h1>
                {error && <p className="text-red-500">Error fetching reviews: {error}</p>}
                <div className="grid gap-4">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyReviewsPage;
