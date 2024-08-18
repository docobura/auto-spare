import React, { useState, useEffect } from 'react';
import ReviewForm from '../components/Reviews/ReviewForm';
import reviewPageBg from '../assets/reviewpagebg.jpg';
import Header from '../components/Header';


// ReviewCard Component
const ReviewCard = ({ title, body }) => (
  <article className="flex flex-col w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col items-start p-4 text-black">
      <h2 className="text-xl font-bold truncate">{title}</h2>
      <p className="mt-2 text-base text-gray-800 truncate">{body}</p>
    </div>
  </article>
);

// ReviewInstructions Component
const ReviewInstructions = () => {
  return (
    <section className="flex flex-col w-11/12 max-w-lg mx-auto text-sm text-black mt-8 mb-8 bg-white p-6 rounded-lg shadow-md">
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
    <footer className="bg-gray-800 text-white py-6">
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
    <main
      className="relative flex flex-col min-h-screen overflow-hidden px-8 pt-12 pb-20 bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${reviewPageBg})` }} 
    >
      <div className="absolute inset-0 bg-black opacity-85"></div> 
      <Header />
      <h1 className="text-3xl font-bold text-white text-center mt-20 mb-8 max-md:text-2xl max-md:mt-12 relative z-10">
        Leave a review!
      </h1>
      <div className="self-center mt-8 w-full max-w-[1400px] max-md:mt-8 max-md:max-w-full relative z-10">
        <div className="flex gap-4 max-md:flex-col">
          <ReviewForm
            initialValues={{ title: '', body: '' }}
            onSubmit={handleSubmit}
          />
          <ReviewInstructions />
        </div>
      </div>
      <section className="self-end mt-14 w-full max-w-[1619px] max-md:mt-10 max-md:mr-1.5 max-md:max-w-full relative z-10">
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
