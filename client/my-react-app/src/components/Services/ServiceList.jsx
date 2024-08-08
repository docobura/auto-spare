import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services, onServiceSelect }) => {
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col pt-[72px]">
      <section className="flex flex-col items-center px-10 pt-14 pb-32 w-full bg-gray-800 text-white">
        <div className="flex flex-col w-full max-w-[1080px]">
          <h2 className="self-center text-3xl text-center">Our Services:</h2>
          <div className="flex flex-wrap gap-5 justify-between mt-9">
            {services.map((service, index) => (
              <ServiceItem 
                key={index} 
                label={service.label} 
                imageUrl={service.imageUrl} 
                onClick={() => onServiceSelect(service)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceList;
