import React from 'react';
import ServiceItem from './ServiceItem';

const services = [
  { icon: 'collisionRepairs', label: 'Collision Repairs' },
  { icon: 'oilChanges', label: 'Oil Changes' },
  { icon: 'brakes', label: 'Brakes' },
  { icon: 'sprayPainting', label: 'Spray Painting' },
  { icon: 'wheelAlignment', label: 'Wheel Alignment' },
  { icon: 'carServicing', label: 'Car Servicing' },
  { icon: 'exhausts', label: 'Exhausts' },
];

const ServiceList = ({ onServiceSelect }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {services.map((service, index) => (
        <ServiceItem 
          key={index} 
          icon={service.icon} 
          label={service.label} 
          onClick={() => onServiceSelect(service)}
        />
      ))}
    </div>
  );
};

export default ServiceList;
