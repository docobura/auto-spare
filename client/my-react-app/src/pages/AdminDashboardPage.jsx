// AdminDashboard.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; // Adjust the import path
import { useState } from 'react';

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

const DashboardItem = ({ title, onClick }) => (
  <div
    className="p-4 text-lg text-center text-white bg-slate-600 rounded-lg cursor-pointer hover:bg-slate-500"
    onClick={onClick}
  >
    {title}
  </div>
);

const Footer = () => {
  const footerLinks = ['Home', 'Products', 'Services', 'Contact'];
  return (
    <footer className="flex flex-col items-center px-6 py-8 w-full text-white bg-black">
      <nav className="flex gap-6 text-xl max-w-full justify-center">
        {footerLinks.map((link, index) => (
          <a key={index} href="#" className="my-auto">
            {link}
          </a>
        ))}
      </nav>
      <div className="mt-6 text-lg">
        2024 AutoSavy. All rights reserved.
      </div>
    </footer>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleItemClick = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login'); 
    } else {
      navigate(path);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-300">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          <DashboardItem title="Add Products" onClick={() => handleItemClick('/add-product')} />
          <DashboardItem title="View Customer Reviews" onClick={() => handleItemClick('/reviews')} />
          <DashboardItem title="View Customer Orders" onClick={() => handleItemClick('/orders')} />
          <DashboardItem title="Log out" onClick={() => handleItemClick('/logout')} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
