import React from 'react';
import { Link } from 'react-router-dom';
import AddProductsForm from '../components/Products/AddProductsForm';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex gap-4 justify-center">
        <div className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="flex-auto">AutoSavy</div>
        </div>
        <div className="flex items-center gap-4 text-sm text-black">
          <Link to="/shop">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
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
