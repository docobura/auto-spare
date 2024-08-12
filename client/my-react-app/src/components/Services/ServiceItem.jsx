import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; 

const ServiceItem = ({ id, label, imageUrl, description, price }) => {
  const { authToken } = useAuth();
  const navigate = useNavigate(); 

  const handleBookService = async () => {
    try {
      // Redirect to the appointment page with service parameters
      navigate(`/service-appointment?id=${id}&label=${encodeURIComponent(label)}&imageUrl=${encodeURIComponent(imageUrl)}`);
    } catch (error) {
      console.error('Error navigating to appointment page:', error);
    }
  };

  return (
    <div className="max-w-[300px] p-4 border rounded-lg shadow-lg bg-white">
      <Link 
        to={`/service-appointment?id=${id}&label=${encodeURIComponent(label)}&imageUrl=${encodeURIComponent(imageUrl)}`}
        className="block"
      >
        <img src={imageUrl} alt={label} className="w-full h-[200px] object-cover rounded-md" />
        <h3 className="mt-2 text-xl font-semibold text-black">{label}</h3>
        <p className="mt-1 text-gray-700">{description}</p> 
        <p className="mt-2 text-lg font-bold text-black">${price}</p> 
      </Link>
      <button 
        onClick={handleBookService} 
        className="mt-4 block text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Book Service
      </button>
    </div>
  );
};

export default ServiceItem;
