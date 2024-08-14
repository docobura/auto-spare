import React, { useEffect, useState } from 'react';
import OrderList from '../components/Orders/OrderList';
import { useAuth } from '../components/Auth/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';

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

const OrderListPage = () => {
  const { authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders', {
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
