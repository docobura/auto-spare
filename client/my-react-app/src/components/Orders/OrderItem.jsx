// src/components/OrderItem.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';

const OrderItem = ({ orderId }) => {
  const { authToken } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId, authToken]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="mb-8 p-6 bg-zinc-300 rounded-3xl">
      <div className="mb-4">
        <span className="font-bold">Customer:</span> {order.customerName}
      </div>
      <div className="mb-4">
        <span className="font-bold">Product:</span> {order.productName}
      </div>
      <div className="mb-4">
        <span className="font-bold">Quantity:</span> {order.quantity}
      </div>
      <div className="mb-4">
        <span className="font-bold">Order Date:</span> {order.orderDate}
      </div>
      <div>
        <span className="font-bold">Status:</span> {order.status}
      </div>
    </div>
  );
};

export default OrderItem;
