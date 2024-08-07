import React from 'react';
import { Link } from 'react-router-dom';

const ServiceItem = ({ label, imageUrl }) => {
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
