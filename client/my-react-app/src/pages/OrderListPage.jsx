import React from 'react';
import OrderList from '../components/Orders/OrderList';

const Header = () => (
  <header className="flex flex-wrap gap-10 self-end py-7 pr-20 pl-10 w-full text-3xl text-black whitespace-nowrap bg-white bg-opacity-50 rounded-[81px] max-md:px-5">
    <div className="flex gap-1.5">
      <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
      <div className="my-auto">AutoSavy</div>
    </div>
    <nav className="flex gap-10 my-auto text-center max-md:max-w-full">
      <a href="#shop">Shop</a>
      <a href="#dashboard">Dashboard</a>
      <a href="#servicing">Servicing</a>
      <a href="#reviews">Reviews</a>
    </nav>
  </header>
);

const OrderListPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-stone-950">
      <Header />
      <section className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
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
