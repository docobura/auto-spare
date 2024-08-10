import React from 'react';
import { Link } from 'react-router-dom';
import AddProductsForm from '../components/Products/AddProductsForm';

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

const AddProductFormPage = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8 bg-black w-screen h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md h-screen p-4 rounded-lg">
          <AddProductsForm />
        </div>
      </main>
    </div>
  );
};

export default AddProductFormPage;
