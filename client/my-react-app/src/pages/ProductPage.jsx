import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

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

const QuantityInput = ({ quantity, setQuantity }) => {
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-32">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 border-r border-gray-300"
        aria-label="Decrease quantity"
      >
        <svg className="w-3 h-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13H5m14-6H5m14 12H5" />
        </svg>
      </button>
      <span className="px-3 py-1 text-lg flex-1 text-center">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 border-l border-gray-300"
        aria-label="Increase quantity"
      >
        <svg className="w-3 h-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13H5m7-7v14m-7-7h14" />
        </svg>
      </button>
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://auto-spare.onrender.com/parts/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Error fetching product details.');
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Add to Cart clicked with quantity:', quantity);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col px-4 pt-14 pb-10 bg-black min-h-screen max-md:px-2 max-md:pb-6 w-screen">
      <Header />
      <div className="self-center mt-10 w-full max-w-[1200px] max-md:mt-6">
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0 lg:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Product Information and Add to Cart Button */}
          <div className="flex-1 lg:ml-6 lg:w-1/2">
            <h1 className="text-3xl text-white">{product.name}</h1>
            <p className="text-lg text-gray-300 mt-2">{product.description}</p>
            <div className="mt-4">
              <span className="text-xl text-white">Price: ${product.price}</span>
            </div>
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <button
              className="mt-4 px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Review Section Below Product Details */}
        <section className="mt-10">
          <h2 className="text-2xl text-white">Reviews</h2>
          <p className="mt-5 text-xl max-md:mt-4 max-md:max-w-full">
            This product doesn't have reviews.
          </p>
          <button
            className="px-8 py-4 mt-4 text-xl text-center bg-slate-600 rounded-[20px] max-md:px-4"
            onClick={() => navigate('/reviews')}
          >
            Add a review
          </button>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
