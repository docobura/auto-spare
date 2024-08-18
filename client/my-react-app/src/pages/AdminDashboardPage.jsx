import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; 
import Header from '../components/Header';

const DashboardItem = ({ title, onClick }) => (
  <div
    className="p-4 text-lg text-center text-white bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-400"
    onClick={onClick}
  >
    {title}
  </div>
);

const Footer = () => {
  const footerLinks = ['Home', 'Products', 'Services', 'Contact'];
  return (
    <footer className="flex flex-col items-center px-6 py-8 w-full text-black bg-white">
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

  // Dummy data for total sales and income
  const totalSales = 12345.67;
  const totalIncome = 89012.34;

  const handleItemClick = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login'); 
    } else {
      navigate(path);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>

        {/* Display Total Sales and Income */}
        <div className="mb-8 text-xl text-center text-black">
          <div>Total Sales: ${totalSales.toFixed(2)}</div>
          <div>Total Income: ${totalIncome.toFixed(2)}</div>
        </div>

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
