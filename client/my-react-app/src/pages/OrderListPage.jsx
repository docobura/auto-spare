import React, { useEffect, useState } from 'react';
import OrderList from '../components/Orders/OrderList';
import { useAuth } from '../components/Auth/AuthContext'; 
import Header from '../components/Header';

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

  if (loading) return <p className="text-black text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">Error fetching orders: {error.message}</p>;

  return (
    <main className="flex flex-col h-screen w-screen bg-white">
      <Header />
      <section className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black">Customer Orders</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderList orders={orders} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderListPage;
