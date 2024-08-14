import React, { useState, useEffect } from 'react';
import ReviewForm from '../components/Reviews/ReviewForm';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userRole === 'Admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white rounded-full shadow-md">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
          <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
          <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
          <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
          <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
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
      </nav>
    </header>
  );
};

const ReviewCard = ({ title, body }) => (
  <article className="flex flex-col w-full max-w-md mx-auto p-4 bg-zinc-300 rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col items-start p-4 text-black">
      <h2 className="text-xl font-bold truncate">{title}</h2>
      <p className="mt-2 text-base text-gray-800 truncate">{body}</p>
    </div>
  </article>
);

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

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/reviews');
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
    <main className="flex overflow-hidden flex-col px-8 pt-12 pb-20 bg-black max-md:px-3 max-md:pb-16 w-screen">
      <Header />
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
    </main>
  );
};

export default ReviewPage;
