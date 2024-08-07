import React from 'react';
import OrderItem from './OrderItem';

const OrderList = () => {
  const orders = [
    {
      customerName: 'John Doe',
      productName: 'Car Part A',
      quantity: 2,
      orderDate: '2023-06-01',
      status: 'Shipped'
    },
    {
      customerName: 'Jane Smith',
      productName: 'Car Part B',
      quantity: 1,
      orderDate: '2023-06-02',
      status: 'Processing'
    },
    {
      customerName: 'Bob Johnson',
      productName: 'Car Part C',
      quantity: 3,
      orderDate: '2023-06-03',
      status: 'Delivered'
    },
    {
      customerName: 'Alice Brown',
      productName: 'Car Part D',
      quantity: 1,
      orderDate: '2023-06-04',
      status: 'Pending'
    },
    {
      customerName: 'Charlie Wilson',
      productName: 'Car Part E',
      quantity: 2,
      orderDate: '2023-06-05',
      status: 'Shipped'
    },
  ];

  return (
    <div className="flex flex-col grow px-11 pt-11 pb-24 w-full text-3xl text-black bg-slate-600 rounded-[65px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderList;