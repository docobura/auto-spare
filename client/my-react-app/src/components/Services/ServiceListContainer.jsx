import React, { useEffect, useState } from "react";
import ServiceList from "./ServiceList";
import ServiceForm from "./ServiceForm";
import { useAuth } from "../Auth/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/shop" className="text-black hover:text-gray-700">
            Shop
          </Link>
          <Link to="/dashboard" className="text-black hover:text-gray-700">
            Dashboard
          </Link>
          <Link to="/servicing" className="text-black hover:text-gray-700">
            Servicing
          </Link>
          <Link to="/reviews" className="text-black hover:text-gray-700">
            Reviews
          </Link>
          <Link to="/cart" className="text-black hover:text-gray-700">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
};

const ServiceListContainer = () => {
  const [services, setServices] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/services", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include token in request headers
          },
        });
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [authToken]);

  return (
    <div className="h-screen w-screen">
      <Header />
      <ServiceForm />
      <ServiceList services={services} />
    </div>
  );
};

export default ServiceListContainer;
