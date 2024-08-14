import React, { useState, useEffect } from 'react';
import ServiceItem from '../components/Services/ServiceItem';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userRole === 'Admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white rounded-full shadow-md">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
          <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
          <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
          <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
          <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
          {userRole ? (
            <button 
              onClick={handleLogout} 
              className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-black hover:text-gray-700">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

const ServicingPage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ order_id: '', mechanic_id: '', description: '', cost: '', imageUrl: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        const createdService = await response.json();
        setServices([...services, createdService]);
        setNewService({ order_id: '', mechanic_id: '', description: '', cost: '', imageUrl: '' });
      } else {
        console.error('Error adding service:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(service => service.id !== serviceId));
      } else {
        console.error('Error deleting service:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  return (
    <section className="h-screen flex flex-col items-center px-10 pt-14 pb-32 w-full text-black bg-gray-50">
      <div className="flex flex-col w-full max-w-[1080px]">
        <Header />
        <h2 className="self-center text-3xl text-center">Our Services:</h2>
        <div className="flex flex-wrap gap-5 justify-between mt-9">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <ServiceItem 
                label={service.description} 
                imageUrl={service.imageUrl} 
                onClick={() => console.log('Selected service:', service)}
              />
              <button 
                onClick={() => handleDeleteService(service.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-md p-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddService} className="mt-10">
          <h3 className="text-2xl">Add New Service</h3>
          <div className="flex flex-col mt-4">
            <label className="mt-4">
              Order ID:
              <input 
                type="number" 
                name="order_id" 
                value={newService.order_id} 
                onChange={handleChange} 
                className="p-2 border rounded-md bg-white border-gray-300"
                required 
              />
            </label>
            <label className="mt-4">
              Mechanic ID:
              <input 
                type="number" 
                name="mechanic_id" 
                value={newService.mechanic_id} 
                onChange={handleChange} 
                className="p-2 border rounded-md bg-white border-gray-300"
                required 
              />
            </label>
            <label className="mt-4">
              Description:
              <input 
                type="text" 
                name="description" 
                value={newService.description} 
                onChange={handleChange} 
                className="p-2 border rounded-md bg-white border-gray-300"
                required 
              />
            </label>
            <label className="mt-4">
              Cost:
              <input 
                type="number" 
                step="0.01" 
                name="cost" 
                value={newService.cost} 
                onChange={handleChange} 
                className="p-2 border rounded-md bg-white border-gray-300"
                required 
              />
            </label>
            <label className="mt-4">
              Image URL:
              <input 
                type="text" 
                name="imageUrl" 
                value={newService.imageUrl} 
                onChange={handleChange} 
                className="p-2 border rounded-md bg-white border-gray-300"
              />
            </label>
            <button 
              type="submit" 
              className="mt-4 bg-blue-500 text-white rounded-md p-2"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ServicingPage;
