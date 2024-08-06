import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductsForm from '../components/Products/AddProductsForm';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-7 pr-20 pl-10 bg-white bg-opacity-50 rounded-[81px] max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-1.5 text-3xl text-black whitespace-nowrap max-md:mt-10">
            <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
            <div 
              className="flex-auto my-auto cursor-pointer" 
              onClick={() => navigate('/')}
            >
              AutoSavy
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-5 self-stretch my-auto text-3xl text-center text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
            <div 
              className="cursor-pointer" 
              onClick={() => navigate('/shop')}
            >
              Shop
            </div>
            <div 
              className="flex-auto cursor-pointer" 
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </div>
            <div 
              className="flex-auto cursor-pointer" 
              onClick={() => navigate('/servicing')}
            >
              Servicing
            </div>
            <div 
              className="flex-auto cursor-pointer" 
              onClick={() => navigate('/reviews')}
            >
              Reviews
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};


const AddProductFormPage = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center px-16 py-20 bg-black max-md:px-5">
      <Header />
      <main>
        <AddProductsForm />
      </main>
    </div>
  );
};

export default AddProductFormPage;
