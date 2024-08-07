import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceList from './ServiceList';

const ServiceForm = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="p-4">
      <ServiceList onServiceSelect={handleServiceSelect} selectedService={selectedService} />
      {selectedService && (
        <div className="mt-4 p-4 border rounded-md bg-green-500 ">
          <h3 className="text-lg font-semibold">Selected Service:</h3>
          <p>{selectedService.label}</p>
        </div>
      )}
      <div className="flex justify-between w-full pt-4">
        <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300" onClick={() => setSelectedService(null)}>Reset</button>
        {selectedService && (
          <Link 
            to={`/service-appointment?icon=${selectedService.icon}&label=${encodeURIComponent(selectedService.label)}&imageUrl=${encodeURIComponent(selectedService.imageUrl)}`} 
            className="bg-green-500 p-2 text-white rounded-md hover:bg-green-600"
          >
            Book Service
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceForm;
