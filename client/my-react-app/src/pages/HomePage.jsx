import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../components/Products/ProductItem";
import { useAuth } from "../components/Auth/AuthContext";

const Header = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userRole === "Admin") {
      navigate("/admin-dashboard");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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
          <Link to="/shop" className="px-4 text-black hover:text-gray-700">
            Shop
          </Link>
          <Link to="/servicing" className="px-4 text-black hover:text-gray-700">
            Servicing
          </Link>
          <Link to="/reviews" className="px-4 text-black hover:text-gray-700">
            Reviews
          </Link>
          <Link to="/cart" className="px-4 text-black hover:text-gray-700">
            Cart
          </Link>
          {userRole === "Admin" ? (
            <a
              href="#"
              onClick={handleDashboardClick}
              className="px-1 text-black hover:text-gray-700"
            >
              Dashboard
            </a>
          ) : (
            <div className="relative px-0">
              <button
                onClick={toggleDropdown}
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer"
              >
                myAutoSavy
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/my-reviews"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                  >
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
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-black hover:text-gray-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-screen h-screen bg-black">
      <img
        src="https://i.pinimg.com/564x/85/96/cd/8596cda1fff4e2b33ae77166b3184272.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Overlay */}
      <div className="relative z-10 text-center text-white px-6 py-4">
        <h1 className="text-5xl font-bold mb-4">Drive Smart</h1>
        <p className="text-xl mb-6">
          Your one-stop shop for car parts and servicing needs!
        </p>
        <Link to="/shop">
          <button className="px-6 py-3 text-lg text-white bg-orange-500 rounded-lg shadow-lg">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
};

const UpdateCard = ({ title, date, description, buttonText, buttonLink }) => {
  return (
    <article className="flex flex-col items-start text-xl text-black">
      <div className="bg-zinc-300 h-[200px] rounded-[20px]" />
      <h3 className="mt-2.5">{title}</h3>
      <time className="mt-1 text-lg">{date}</time>
      <p className="mt-2 text-base">{description}</p>
      <Link to={buttonLink}>
        <button className="px-5 py-2 mt-2 text-center text-white bg-slate-600 rounded-full">
          {buttonText}
        </button>
      </Link>
    </article>
  );
};

const Updates = () => {
  const updateData = [
    {
      title: "New Parts Just Arrived!",
      date: "July 30, 2024",
      description:
        "Check out our latest arrivals and get your ride back on the road!",
      buttonText: "Shop",
      buttonLink: "/shop",
    },
    {
      title: "Service Specials This Month!",
      date: "July 28, 2024",
      description:
        "Don't miss our exclusive service deals. Your car deserves it!",
      buttonText: "Services",
      buttonLink: "/servicing",
    },
    {
      title: "Customer Reviews Are In!",
      date: "July 28, 2024",
      description: "See what our happy customers are saying about us!",
      buttonText: "Reviews",
      buttonLink: "/reviews",
    },
  ];

  return (
    <section className="flex flex-col px-10 pt-3 pb-24 w-screen bg-white">
      <h2 className="text-3xl text-center text-black">
        Latest Updates & Offers
      </h2>
      <div className="mt-10 flex gap-5 justify-center">
        {updateData.map((update, index) => (
          <div key={index} className="w-[33%]">
            <UpdateCard {...update} />
          </div>
        ))}
      </div>
    </section>
  );
};
const PartsExplorer = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("https://auto-spare.onrender.com/parts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data.slice(0, 3)); // Display only the first three products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <section className="flex flex-col items-center px-8 py-10 w-screen bg-gray-50">
      <div className="flex flex-col items-center w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">
          Explore Our Parts
        </h2>
        <div className="flex flex-wrap gap-6 justify-center mb-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
              />
            ))
          ) : (
            <p className="text-lg">No products available.</p>
          )}
        </div>
        <Link to="/shop">
          <button className="px-6 py-3 text-lg text-white bg-blue-500 rounded-lg">
            View More
          </button>
        </Link>
      </div>
    </section>
  );
};

const OrangeSection = () => (
  <header className="flex flex-col items-center px-8 py-10 w-screen bg-white">
    <div className="flex flex-col items-center w-full max-w-3xl">
      <h1 className="text-3xl text-center text-black">
        Rev Up Your Ride Today!
      </h1>
      <h2 className="mt-4 text-2xl text-center text-black">
        Get the best parts and services for your car.
      </h2>
      <div className="mt-6 flex gap-4 justify-center">
        <Link to="/shop">
          <button className="px-6 py-3 text-lg text-white bg-slate-600 rounded-full">
            Get parts
          </button>
        </Link>
        <Link to="/servicing">
          <button className="px-6 py-3 text-lg text-white bg-slate-600 rounded-full">
            Book servicing
          </button>
        </Link>
      </div>
    </div>
  </header>
);

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API
    fetch("https://auto-spare.onrender.com/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <section className="flex flex-col items-center px-8 py-10 w-screen text-center text-black bg-white">
      <div className="flex flex-col items-center w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Previous Reviews</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <article
                key={index}
                className="flex flex-col w-full max-w-md bg-zinc-300 rounded-lg p-6"
              >
                <h3 className="text-2xl font-semibold mb-2">{review.title}</h3>
                <hr className="my-2 border-black" />
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
      className={`relative flex flex-col gap-4 px-6 py-4 mt-4 bg-white border border-gray-300 rounded-lg ${
        isExpanded ? "mb-12" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="cursor-pointer flex items-center justify-between">
        <h3 className="text-xl">{question}</h3>
        <span className="text-xl text-gray-600">{isExpanded ? "-" : "+"}</span>
      </div>
      {isExpanded && <p className="mt-2 text-lg text-gray-700">{answer}</p>}
    </div>
  );
};

const FAQs = () => {
  const faqData = [
    {
      question: "How do I order car parts?",
      answer:
        "You can order car parts through our online shop by adding the parts to your cart and proceeding to checkout.",
    },
    {
      question: "Can I book a service online?",
      answer:
        "Yes, you can book a service online by visiting the 'Servicing' section on our website.",
    },
    {
      question: "What if I need to cancel?",
      answer:
        "To cancel an order or service, please contact our customer service team as soon as possible.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email to track your order.",
    },
    {
      question: "Do you offer warranties on parts?",
      answer:
        "Yes, we offer warranties on many of our parts. Please check the product details for specific warranty information.",
    },
  ];

  return (
    <section className="flex flex-col px-8 py-10 w-screen text-center text-black bg-gray-50">
      <h2 className="text-3xl mb-6">FAQ</h2>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </section>
  );
};

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          const response = await fetch('https://auto-spare.onrender.com/contact-us', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: userEmail,
                  message,
                  phone,
              }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Email sending failed: ${errorData.error || 'Unknown error'}`);
          }

          const result = await response.json();
          console.log('Message sent successfully:', result.message);
          // Optionally show a success message to the user

      } catch (error) {
          console.error('Error sending message:', error.message);
          // Optionally show a user-friendly error message
      }
  };

  return (
      <section className="flex flex-col items-center px-8 py-10 w-screen text-center text-black bg-gray-50">
          <div className="flex flex-col w-full max-w-3xl">
              <h2 className="text-3xl mb-6">Contact Us</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full py-3 text-lg bg-white border border-gray-300 rounded-md"
                      placeholder="Message"
                      required
                  />
                  <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-3 text-lg bg-white border border-gray-300 rounded-md"
                      placeholder="Phone"
                  />
                  <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full py-3 text-lg bg-white border border-gray-300 rounded-md"
                      placeholder="Your Email"
                      required
                  />
                  <button
                      type="submit"
                      className="w-full px-4 py-2 text-lg text-center text-white bg-slate-600 rounded-full"
                  >
                      Submit
                  </button>
              </form>
          </div>
      </section>
  );
};


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
