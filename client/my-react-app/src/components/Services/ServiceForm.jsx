import React, { useState } from 'react';
import ServiceList from './ServiceList';

const ServiceForm = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleBooking = async () => {
    if (selectedService) {
      try {
        
        const response = await fetch('http://127.0.0.1:5555/services/${id}',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ service: selectedService.label }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert(`Booking successful: ${result.message}`);
      } catch (error) {
        console.error('Error booking service:', error);
        alert('Error booking service. Please try again.');
      }
    } else {
      alert('Please select a service to book.');
    }
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
        <button className="bg-green-500 p-2 text-white rounded-md hover:bg-green-600" onClick={handleBooking}>Book Service</button>
      </div>
    </div>
  );
};

export default ServiceForm;
