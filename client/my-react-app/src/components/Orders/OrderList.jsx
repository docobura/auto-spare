import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders'); 
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col grow px-11 pt-11 pb-24 w-full text-3xl text-black bg-slate-600 rounded-[65px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
