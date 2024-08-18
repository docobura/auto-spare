import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          id={service.id}
          label={service.description}
          imageUrl={service.image_url}
          description={service.additionalDescription}
          price={service.cost}
          className="bg-white text-black rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-200"
        />
      ))}
    </div>
  );
};

export default ServiceList;
