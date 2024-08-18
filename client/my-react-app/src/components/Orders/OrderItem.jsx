import React from 'react';

const OrderItem = ({ orderDate, status, totalAmount }) => {
  return (
    <article className="flex flex-col items-start p-8 mt-8 bg-white text-black rounded-[20px] shadow-lg">
      <div className="mb-4">
        <span className="font-bold">Order Date:</span> {new Date(orderDate).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <span className="font-bold">Status:</span> {status}
      </div>
      <div>
        <span className="font-bold">Total Amount:</span> ${totalAmount}
      </div>
    </article>
  );
};

export default OrderItem;
