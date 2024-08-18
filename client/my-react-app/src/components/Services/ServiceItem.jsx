import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; 

const ServiceItem = ({ id, label, imageUrl, description, price }) => {
  const { authToken } = useAuth();
  const navigate = useNavigate(); 

  const handleBookService = async () => {
    try {
      navigate(`/service-appointment?id=${id}&label=${encodeURIComponent(label)}&imageUrl=${encodeURIComponent(imageUrl)}`);
    } catch (error) {
      console.error('Error navigating to appointment page:', error);
    }
  };

  return (
    <div className="w-[300px] h-[400px] p-4 border rounded-lg shadow-lg bg-white">
      <Link 
        to={`/service-appointment?id=${id}&label=${encodeURIComponent(label)}&imageUrl=${encodeURIComponent(imageUrl)}`}
        className="block h-full"
      >
        <img src={imageUrl} alt={label} className="w-full h-[200px] object-cover rounded-md" />
        <h3 className="mt-2 text-xl font-semibold text-black">{label}</h3>
        <p className="mt-1 text-gray-700 truncate">{description}</p> 
        <p className="mt-2 text-lg font-bold text-black">${price}</p> 
        <button 
          onClick={handleBookService} 
          className="mt-4 block text-center bg-orange-500 text-black py-2 rounded-md hover:bg-orange-600"
        >
          Book Service
        </button>
      </Link>
    </div>
  );
};

export default ServiceItem;
