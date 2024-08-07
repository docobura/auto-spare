import React from 'react';
import ReviewForm from '../components/Reviews/ReviewForm';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm text-black">
          <Link to="/shop">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>
    </header>
  );
};

const ReviewInstructions = () => {
  return (
    <section className="flex flex-col w-screen ml-5 max-md:ml-0 max-md:w-full">
      <div className="text-3xl text-white max-md:mt-8 max-md:max-w-full">
        <h2>Share Your Experience</h2>
        <p>
          We value your feedback and invite you to share your thoughts about our products and services. Your review, whether positive or negative, helps us understand what we're doing well and where we can improve. Please take a moment to describe your experience in detail. Your insights are important to us and to other customers who rely on honest reviews when making their decisions.
        </p>
      </div>
    </section>
  );
};

const ReviewPage = () => {
  const handleSubmit = (values) => {
    console.log('Submitted review:', values);
  };

  return (
    <main className="flex overflow-hidden flex-col px-8 pt-12 pb-20 bg-black max-md:px-3 max-md:pb-16 w-screen">
      <Header />
      <h1 className="self-start mt-16 ml-8 text-5xl text-white max-md:mt-8 max-md:max-w-full max-md:text-3xl">
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
      <button
        type="submit"
        className="px-8 py-3 mt-10 ml-8 text-3xl text-center text-white bg-slate-600 rounded-[20px] w-[250px] max-md:px-4 max-md:mt-8 max-md:text-2xl"
      >
        Add Review
      </button>
    </main>
  );
};

export default ReviewPage;
