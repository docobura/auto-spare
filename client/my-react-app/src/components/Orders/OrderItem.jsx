import React from 'react';

const OrderItem = ({ order }) => {
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