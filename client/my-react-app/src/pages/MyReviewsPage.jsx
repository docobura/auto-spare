import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userRole === 'Admin') {
      navigate('/admin-dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 py-2 px-4 w-[90%] mx-auto bg-white rounded-lg shadow-md"> 
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex items-center">
          <div className="px-4">
            <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
          </div>
          
          <div className="px-4">
            <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
          </div>
          <div className="px-4">
            <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
          </div>
          <div className="px-4">
            <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
          </div>
          {userRole === 'Admin' ? (
            <div className="px-1">
              <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
            </div>
          ) : (
            <div className="relative px-0">
              <button 
                onClick={toggleDropdown} 
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                myAutoSavy
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link 
                    to="/my-orders" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    My Orders
                  </Link>
                  <Link 
                    to="/my-reviews" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    My Reviews
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="px-3">
            {userRole ? (
              <button 
                onClick={handleLogout} 
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-black hover:text-gray-700">Login</Link>
            )}
          </div>
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
                const response = await fetch(`https://auto-spare.onrender.com/reviews/${userId}`, {
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
