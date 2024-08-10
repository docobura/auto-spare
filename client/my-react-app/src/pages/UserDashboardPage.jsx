import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
          <Link to="/dashboard" className="text-black hover:text-gray-700">Dashboard</Link>
          <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
          <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
          <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
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

const UserDashboardPage = () => {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-300">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          <DashboardItem title="My Orders" onClick={() => handleItemClick('/my-orders')} />
          <DashboardItem title="My Reviews" onClick={() => handleItemClick('/my-reviews')} />
          <DashboardItem title="Log Out" onClick={() => handleItemClick('/logout')} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
