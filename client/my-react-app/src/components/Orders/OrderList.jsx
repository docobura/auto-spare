import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { useAuth } from '../Auth/AuthContext';

const OrderList = () => {
  const { authToken } = useAuth(); // Access the authentication token from context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${authToken}`, // Include token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [authToken]); // Add authToken as a dependency to refetch if it changes

  return (
    <div className="flex flex-col grow px-11 pt-11 pb-24 w-full text-3xl text-black bg-slate-600 rounded-[65px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
