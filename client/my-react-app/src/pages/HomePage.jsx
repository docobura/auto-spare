import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ProductItem from '../components/Products/ProductItem'; 
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

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-10 pt-32 pb-60 w-screen bg-black h-screen">
      <h1 className="mt-10 text-5xl text-center text-orange-300">Drive Smart</h1>
      <p className="mt-5 text-xl text-center text-white">Your one-stop shop for car parts and servicing needs!</p>
      <Link to="/shop">
        <button className="mt-5 px-5 py-2 text-lg text-white bg-orange-500 rounded-lg">Explore Now</button>
      </Link>
    </section>
  );
};

const UpdateCard = ({ title, date, description, buttonText, buttonLink }) => {
  return (
    <article className="flex flex-col items-start mt-3.5 text-xl text-black">
      <div className="flex shrink-0 self-stretch bg-zinc-300 h-[200px] rounded-[20px]" />
      <h3 className="mt-2.5">{title}</h3>
      <time className="mt-1 text-lg">{date}</time>
      <p className="self-stretch mt-2 text-base">{description}</p>
      <Link to={buttonLink}>
        <button className="px-5 py-2 mt-2 text-center text-white bg-slate-600 rounded-full">{buttonText}</button>
      </Link>
    </article>
  );
};

const Updates = () => {
  const updateData = [
    {
      title: "New Parts Just Arrived!",
      date: "July 30, 2024",
      description: "Check out our latest arrivals and get your ride back on the road!",
      buttonText: "Shop",
      buttonLink: "/shop"
    },
    {
      title: "Service Specials This Month!",
      date: "July 28, 2024",
      description: "Don't miss our exclusive service deals. Your car deserves it!",
      buttonText: "Services",
      buttonLink: "/servicing"
    },
    {
      title: "Customer Reviews Are In!",
      date: "July 28, 2024",
      description: "See what our happy customers are saying about us!",
      buttonText: "Reviews",
      buttonLink: "/reviews"
    }
  ];

  return (
    <section className="flex flex-col px-10 pt-3 pb-24 w-screen bg-white h-screen">
      <h2 className="self-center text-3xl text-center text-black">Latest Updates & Offers</h2>
      <div className="mt-10 flex gap-5 justify-center">
        {updateData.map((update, index) => (
          <div key={index} className="flex flex-col w-[33%]">
            <UpdateCard {...update} />
          </div>
        ))}
      </div>
    </section>
  );
};

const PartsExplorer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('http://localhost:5000/parts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="flex flex-col items-center px-10 pt-14 pb-32 w-screen text-black bg-gray-50 h-screen">
      <div className="flex flex-col w-full max-w-[1080px]">
        <h2 className="self-center text-3xl font-bold mb-6">Explore Our Parts</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {products.length > 0 ? (
            products.map(product => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))
          ) : (
            <p className="text-lg text-center">No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const OrangeSection = () => (
  <header className="flex flex-col items-center px-10 pt-14 pb-36 w-screen bg-red-200 h-screen">
    <div className="flex flex-col items-center w-full max-w-[994px]">
      <h1 className="text-3xl text-center text-black">Rev Up Your Ride Today!</h1>
      <h2 className="self-stretch mt-10 text-3xl text-center text-black">Get the best parts and services for your car.</h2>
      <div className="mt-10 w-full flex gap-5 justify-center">
        <Link to="/shop">
          <button className="px-8 py-4 text-lg text-center text-white bg-slate-600 rounded-full">Get parts</button>
        </Link>
        <Link to="/servicing">
          <button className="px-8 py-4 text-lg text-center text-white bg-slate-600 rounded-full">Book servicing</button>
        </Link>
      </div>
    </div>
  </header>
);

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API
    fetch('http://localhost:5000/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <section className="flex flex-col px-10 pt-14 pb-32 w-screen text-center text-black bg-white h-screen">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl font-bold mb-8">Previous Reviews</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <article key={index} className="flex flex-col w-full max-w-2xl bg-zinc-300 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">{review.title}</h3>
                <hr className="my-3 border-black" />
                <p className="text-lg">{review.body}</p>
              </article>
            ))
          ) : (
            <p className="text-lg">No reviews available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative flex flex-col gap-4 px-10 py-8 mt-10 bg-white border border-gray-300 rounded-lg ${isExpanded ? 'mb-24' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="cursor-pointer flex items-center justify-between">
        <h3 className="text-2xl">{question}</h3>
        <span className="text-lg text-gray-600">
          {isExpanded ? '-' : '+'}
        </span>
      </div>
      {isExpanded && (
        <p className="mt-2 text-lg text-gray-700">{answer}</p>
      )}
    </div>
  );
};


const FAQs = () => {
  const faqData = [
    {
      question: "How do I order car parts?",
      answer: "You can order car parts through our online shop by adding the parts to your cart and proceeding to checkout."
    },
    {
      question: "Can I book a service online?",
      answer: "Yes, you can book a service online by visiting the 'Servicing' section on our website."
    },
    {
      question: "What if I need to cancel?",
      answer: "To cancel an order or service, please contact our customer service team as soon as possible."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email to track your order."
    },
    {
      question: "Do you offer warranties on parts?",
      answer: "Yes, we offer warranties on many of our parts. Please check the product details for specific warranty information."
    }
  ];

  return (
    <section className="flex flex-col px-10 pt-10 pb-36 w-screen text-center text-black bg-gray-50">
      <h2 className="text-3xl mb-8">FAQ</h2>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </section>
  );
};


const ContactUs = () => (
  <section className="flex flex-col items-center px-10 pt-10 pb-32 w-screen text-center text-black bg-gray-50 h-screen">
    <div className="flex flex-col w-full max-w-[1080px]">
      <h2 className="self-center text-3xl">Contact Us</h2>
      <div className="flex flex-wrap gap-5 justify-between mt-9">
        <textarea className="w-full py-5 text-lg bg-white border border-gray-300 rounded-md" placeholder="Message" />
        <input type="text" className="w-full py-5 text-lg bg-white border border-gray-300 rounded-md" placeholder="Phone" />
        <button className="w-full px-4 py-2 mt-2 text-lg text-center text-white bg-slate-600 rounded-full">Submit</button>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Updates />
      <PartsExplorer />
      <OrangeSection />
      <ReviewSection />
      <FAQs />
      <ContactUs />
    </>
  );
};

export default HomePage;