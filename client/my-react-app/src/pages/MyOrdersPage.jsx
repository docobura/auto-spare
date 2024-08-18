import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import Header from '../components/Header';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://auto-spare.onrender.com/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://auto-spare.onrender.com/cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data.items || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
    fetchCartItems().finally(() => setLoading(false));
  }, [authToken]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">My Orders</h1>
        {loading ? (
          <p className="text-black">Loading...</p>
        ) : error ? (
          <p className="mt-4 text-red-600">{error}</p>
        ) : orders.length > 0 ? (
          <div className="w-full max-w-md mx-auto">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-4 mb-4 rounded-lg shadow-md text-black">
                <p>Status: {order.status}</p>
                <p>Total Amount: ${Number(order.total_amount).toFixed(2)}</p>
                <p>Ordered on: {formatDate(order.created_at)}</p>
                <p className="font-semibold mt-2">Items:</p>
                <div>
                  {cartItems.map(item => (
                    <div key={item.part_id}>
                      <p>Part Name: {item.part_name}</p>
                      <p>Quantity: {item.quantity}</p>
                      {item.image_url && <img src={item.image_url} alt={item.part_name} className="w-16 h-16 object-cover mt-2" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-black">You have no orders.</p>
        )}
      </main>
    </div>
  );
};

export default MyOrdersPage;
