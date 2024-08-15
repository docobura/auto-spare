import React, { useState, useEffect } from 'react';
import ReviewForm from '../components/Reviews/ReviewForm';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

// Header Component
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

// ReviewCard Component
const ReviewCard = ({ title, body }) => (
  <article className="flex flex-col w-full max-w-md mx-auto p-4 bg-zinc-300 rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col items-start p-4 text-black">
      <h2 className="text-xl font-bold truncate">{title}</h2>
      <p className="mt-2 text-base text-gray-800 truncate">{body}</p>
    </div>
  </article>
);

// ReviewInstructions Component
const ReviewInstructions = () => {
  return (
    <section className="flex flex-col w-11/12 max-w-lg mx-auto text-sm text-white mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
      <p>
        We value your feedback and invite you to share your thoughts about our products and services. Your review, whether positive or negative, helps us understand what we're doing well and where we can improve. Please take a moment to describe your experience in detail. Your insights are important to us and to other customers who rely on honest reviews when making their decisions.
      </p>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} AutoSavy. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy-policy" className="text-gray-400 hover:text-gray-300">Privacy Policy</a> |{' '}
          <a href="/terms-of-service" className="text-gray-400 hover:text-gray-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// ReviewPage Component
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch('https://auto-spare.onrender.com/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = filteredReviews.sort((a, b) => {
    switch (filter) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt); 
      default:
        return 0;
    }
  });

  const handleSubmit = (values) => {
    console.log('Submitted review:', values);
  };

  return (
    <main className="flex flex-col min-h-screen px-8 pt-12 pb-20 bg-black max-md:px-3 max-md:pb-16 w-screen">
      <Header />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-white text-center mt-20 mb-8 max-md:text-2xl max-md:mt-12">
          Leave a review!
        </h1>
        <div className="self-center mt-8 w-full max-w-[1400px] max-md:mt-8 max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-col">
            <ReviewForm
              initialValues={{ title: '', body: '' }}
              onSubmit={handleSubmit}
            />
            <ReviewInstructions />
          </div>
        </div>
        <section className="self-end mt-14 w-full max-w-[1619px] max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Other Reviews</h2>
          <div className="flex gap-5 max-md:flex-col">
            {sortedReviews.map(review => (
              <ReviewCard
                key={review.id}
                title={review.title}
                body={review.body}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ReviewPage;
