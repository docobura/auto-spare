import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services }) => {
  return (
    <section className="flex flex-wrap gap-6 px-10 justify-center py-10 bg-gray-400 h-screen">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          id={service.id} // Pass the service ID
          label={service.description}
          imageUrl={service.image_url}
          description={service.additionalDescription} 
          price={service.cost} 
        />
      ))}
    </section>
  );
};

export default ServiceList;
