import React, { useEffect, useState } from 'react';
import ServiceList from './ServiceList';

const ServiceListContainer = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/services'); // Ensure this URL matches your Flask endpoint
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    // Handle service selection if needed
    console.log('Selected service:', service);
  };

  return (
    <ServiceList services={services} onServiceSelect={handleServiceSelect} />
  );
};

export default ServiceListContainer;
