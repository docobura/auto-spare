import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../components/Orders/OrderList';

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


const OrderListPage = () => {
  return (
    <main className="flex flex-col h-screen bg-stone-950 w-screen">
      <Header />
      <section className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto w-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderList />
            <OrderList />
          </div>
        </div>
      </section>
    </main>
  );
};


export default OrderListPage;
