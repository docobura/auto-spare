import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; // Adjust the import path as needed

const ServiceItem = ({ label, imageUrl }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  if (!isAuthenticated) {
    return (
      <article className="flex flex-col items-start self-start mt-4 max-w-[300px] cursor-not-allowed">
        <img loading="lazy" src={imageUrl} alt={label} className="object-contain self-stretch w-full h-[200px] rounded-[20px]" />
        <div className="flex items-center gap-2 mt-2.5 text-xl">
          <h3 className="text-2xl">{label}</h3>
          <p className="text-red-500">Please log in to book this service.</p>
        </div>
      </article>
    );
  }

  return (
    <Link to={`/service-appointment?label=${label}&imageUrl=${encodeURIComponent(imageUrl)}`}>
      <article className="flex flex-col items-start self-start mt-4 max-w-[300px] cursor-pointer">
        <img loading="lazy" src={imageUrl} alt={label} className="object-contain self-stretch w-full h-[200px] rounded-[20px]" />
        <div className="flex items-center gap-2 mt-2.5 text-xl">
          <h3 className="text-2xl">{label}</h3>
        </div>
      </article>
    </Link>
  );
};

export default ServiceItem;
