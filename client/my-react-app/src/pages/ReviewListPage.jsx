import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  
    return (
      <header className="py-7 pr-20 pl-10 bg-white bg-opacity-50 rounded-[81px] max-md:px-5 max-md:max-w-full">
        <nav className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-1.5 text-3xl text-black whitespace-nowrap max-md:mt-10">
              <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
              <div 
                className="flex-auto my-auto cursor-pointer" 
                onClick={() => navigate('/')}
              >
                AutoSavy
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex gap-5 self-stretch my-auto text-3xl text-center text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
              <div 
                className="cursor-pointer" 
                onClick={() => navigate('/shop')}
              >
                Shop
              </div>
              <div 
                className="flex-auto cursor-pointer" 
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </div>
              <div 
                className="flex-auto cursor-pointer" 
                onClick={() => navigate('/servicing')}
              >
                Servicing
              </div>
              <div 
                className="flex-auto cursor-pointer" 
                onClick={() => navigate('/reviews')}
              >
                Reviews
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  };
  

const ReviewCard = ({ name, review }) => (
  <article className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow items-start pt-11 pr-20 pb-80 pl-7 w-full text-5xl text-black whitespace-nowrap bg-zinc-300 rounded-[71px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
      <h2 className="max-md:text-4xl">{name}</h2>
      <p className="mt-14 max-md:mt-10 max-md:text-4xl">{review}</p>
    </div>
  </article>
);

const ReviewListPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews'); // Update this URL with your API endpoint
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="flex overflow-hidden flex-col px-16 pt-14 pb-52 bg-black max-md:px-5 max-md:pb-24">
      <Header />
      <h1 className="self-start mt-20 ml-14 text-7xl text-white max-md:mt-10 max-md:ml-2.5 max-md:text-4xl">
        Reviews
      </h1>
      <section className="self-end mt-14 w-full max-w-[1619px] max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.customerName}
              review={review.reviewBody}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ReviewListPage;
