import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services }) => {
  return (
    <section className="flex flex-wrap gap-6 justify-center py-10 bg-gray-100">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          id={service.id} // Pass the service ID
          label={service.description}
          imageUrl={service.imageUrl}
          description={service.additionalDescription} 
          price={service.cost} 
        />
      ))}
    </section>
  );
};

export default ServiceList;
