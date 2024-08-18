import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import Header from '../components/Header';

const ReviewCard = ({ review }) => (
  <div className="p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold text-black">{review.title}</h2>
    <p className="text-black">{review.body}</p>
    <p className="text-black text-sm">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
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
        const response = await fetch('https://auto-spare.onrender.com/my-reviews', {
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
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-white">
      <Header />
      <div className="pt-24 p-6">
        <h1 className="text-black text-2xl font-semibold mb-4">My Reviews</h1>
        {error && <p className="text-red-500">Error fetching reviews: {error}</p>}
        <div className="grid gap-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="text-black">No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;
