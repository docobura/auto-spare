import React, { useEffect, useState } from 'react';
import ServiceList from './ServiceList';
import { useAuth } from '../Auth/AuthContext'; // Adjust the path to your AuthContext

const ServiceListContainer = () => {
  const [services, setServices] = useState([]);
  const { authToken } = useAuth(); // Access authToken from the authentication context

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/services', {
          headers: {
            'Authorization': `Bearer ${authToken}`, // Include the authToken in the request headers if needed
            'Content-Type': 'application/json', // Ensure the Content-Type is set correctly
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    if (authToken) {
      fetchServices(); // Fetch services only if authToken is available
    }
  }, [authToken]);

  const handleServiceSelect = (service) => {
    console.log('Selected service:', service);
  };

  return (
    <ServiceList services={services} onServiceSelect={handleServiceSelect} />
  );
};

export default ServiceListContainer;
