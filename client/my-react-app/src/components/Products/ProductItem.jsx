import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

const ProductItem = ({ id, name, price, image }) => {
  const { authToken } = useAuth(); // Access authentication token

  // Convert price to a number for formatting
  const formattedPrice = parseFloat(price).toFixed(2);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include token in request headers
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="flex flex-col w-[25%] max-w-[300px] bg-white rounded-lg shadow-md p-4 m-2">
      <Link to={`/parts/${id}`} className="block">
        <img src={image} alt={name} className="object-contain w-full h-auto rounded-lg" />
        <h2 className="mt-2 text-xl font-bold text-black">{name}</h2>
        <p className="text-lg text-gray-700">${formattedPrice}</p>
      </Link>
      <button onClick={handleAddToCart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
