import React from 'react';
import ReviewForm from '../components/Reviews/ReviewForm';
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
  
const ReviewInstructions = () => {
  return (
    <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="text-4xl text-white max-md:mt-10 max-md:max-w-full">
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
    <main className="flex overflow-hidden flex-col px-16 pt-14 pb-28 bg-black max-md:px-5 max-md:pb-24">
      <Header />
      <h1 className="self-start mt-20 ml-14 text-7xl text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        Leave a review!
      </h1>
      <div className="self-center mt-12 w-full max-w-[1607px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ReviewForm
            initialValues={{ title: '', body: '' }}
            onSubmit={handleSubmit}
          />
          <ReviewInstructions />
        </div>
      </div>
      <button
        type="submit"
        className="px-16 py-5 mt-14 ml-10 max-w-full text-5xl text-center text-white bg-slate-600 rounded-[29px] w-[733px] max-md:px-5 max-md:mt-10 max-md:text-4xl"
      >
        Add Review
      </button>
    </main>
  );
};

export default ReviewPage;
