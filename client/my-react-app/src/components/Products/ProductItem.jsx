import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, price, image }) => {
  // Convert price to a number for formatting
  const formattedPrice = parseFloat(price).toFixed(2);

  return (
    <div className="flex flex-col w-[25%] max-w-[300px] bg-white rounded-lg shadow-md p-4 m-2">
      <Link to={`/parts/${id}`} className="block">
        <img src={image} alt={name} className="object-contain w-full h-auto rounded-lg" />
        <h2 className="mt-2 text-xl font-bold text-black">{name}</h2>
        <p className="text-lg text-gray-700">${formattedPrice}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
