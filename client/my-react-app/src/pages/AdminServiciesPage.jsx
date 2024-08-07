import React, { useState, useEffect } from 'react';
import ServiceItem from '../components/Services/ServiceItem';

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
    <section className="flex flex-col items-center px-10 pt-14 pb-32 w-full text-black bg-gray-50">
      <div className="flex flex-col w-full max-w-[1080px]">
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
