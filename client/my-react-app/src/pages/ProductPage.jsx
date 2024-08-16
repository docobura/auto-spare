import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

// QuantityInput Component
const QuantityInput = ({ quantity, setQuantity }) => {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (newValue === '' || (!isNaN(newValue) && Number(newValue) >= 1)) {
      setQuantity(Number(newValue));
    }
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md w-32">
      <button
        onClick={handleDecrease}
        className="w-12 p-2 bg-black-200 border-none rounded-l-md"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        className="w-16 p-2 bg-black-200 border-none text-center"
        aria-label="Custom quantity"
      />
      <button
        onClick={handleIncrease}
        className="w-12 p-2 bg-black-200 border-none rounded-r-md"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
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

// ProductPage Component
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken, userId } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://auto-spare.onrender.com/parts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, authToken]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('https://auto-spare.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          part_id: product.id, 
          part_name: product.name,  
          quantity: quantity,
          price: product.price,
          image_url: product.image_url
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add item to cart. Status: ${response.status}`);
      }

      alert('Product added to cart!');
      navigate('/cart');
    } catch (err) {
      console.error(err.message);
      alert('Failed to add product to cart.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error fetching product details: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 px-4 pt-14 pb-10 bg-black w-screen">
        <div className="self-center mt-10 w-full max-w-[1200px] max-md:mt-6">
          <div className="flex flex-col lg:flex-row w-full gap-6">
            <div className="flex-shrink-0 lg:w-1/2">
              <img
                src={product?.image_url || 'path/to/placeholder-image.jpg'}
                alt={product?.name || 'Product'}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'path/to/placeholder-image.jpg'; 
                }}
              />
            </div>
            <div className="flex-1 lg:ml-6 lg:w-1/2">
              <h1 className="text-3xl text-white">{product?.name || 'Product Name'}</h1>
              <p className="text-lg text-gray-300 mt-2">{product?.description || 'Product Description'}</p>
              <div className="mt-4">
                <span className="text-xl text-white">Price: ${product?.price || '0.00'}</span>
              </div>
              <div className="mt-4">
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              </div>
              <button
                className="mt-4 px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
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
      <Footer />
    </div>
  );
};

export default ProductPage;