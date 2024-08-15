import React, { useEffect, useState } from 'react';
import OrderList from '../components/Orders/OrderList';
import { useAuth } from '../components/Auth/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';

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

const OrderListPage = () => {
  const { authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://auto-spare.onrender.com/orders', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <main className="flex flex-col w-screen bg-gray-100">
      <Header />
      <section className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Customer Orders</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderList orders={orders} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderListPage;
