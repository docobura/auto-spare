import React, { useEffect, useState } from 'react';
import ServiceList from './ServiceList';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm text-black">
          <Link to="/shop">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>
    </header>
  );
};

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
    <>
      <Header /> {/* Include the Header at the top */}
      <ServiceList services={services} onServiceSelect={handleServiceSelect} />
    </>
  );
};

export default ServiceListContainer;
