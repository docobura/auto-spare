import React from 'react';
import OrderItem from './OrderItem'; // Adjust the import path as needed

const OrderList = ({ orders }) => {
  return (
    <div className="flex flex-col grow px-11 pt-11 pb-24 w-full text-3xl text-black bg-slate-600 rounded-[65px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem
            key={order.id} 
            orderDate={order.order_date}
            status={order.status}
            totalAmount={order.total_amount}
          />
        ))
      ) : (
        <p className="text-lg text-center">No orders available.</p>
      )}
    </div>
  );
};

export default OrderList;
