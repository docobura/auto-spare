import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/Products/ProductDetails';
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

const ReviewSection = () => {
  const navigate = useNavigate();

  return (
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
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/parts/${id}`);
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
        <div className="flex flex-col w-full">
          <ProductDetails product={product} />
          <ReviewSection />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
