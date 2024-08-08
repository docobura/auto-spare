import React, { useState, useEffect } from 'react';
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

const ReviewCard = ({ title, body }) => (
  <article className="flex flex-col w-full max-w-md mx-auto p-4 bg-zinc-300 rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col items-start p-4 text-black">
      <h2 className="text-xl font-bold truncate">{title}</h2>
      <p className="mt-2 text-base text-gray-800 truncate">{body}</p>
    </div>
  </article>
);



const ReviewListPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/reviews'); // Update this URL with your API endpoint
        const data = await response.json();
        console.log(data); // Check if data is being fetched correctly
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="flex overflow-hidden flex-col px-16 pt-20 pb-52 bg-black max-md:px-5 max-md:pb-24 w-screen h-screen">
      <Header />
      <h1 className="self-start mt-16 ml-14 text-5xl text-white max-md:mt-8 max-md:ml-2.5 max-md:text-3xl">
        Reviews
      </h1>
      <section className="self-end mt-14 w-full max-w-[1619px] max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id} // Use a unique key if possible
              title={review.title}
              body={review.body}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ReviewListPage;
