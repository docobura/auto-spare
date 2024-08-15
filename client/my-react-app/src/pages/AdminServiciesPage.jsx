import React, { useState, useEffect } from 'react';
import ServiceItem from '../components/Services/ServiceItem';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userRole === 'Admin') {
      navigate('/admin-dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 py-2 px-4 w-[90%] mx-auto bg-white rounded-lg shadow-md"> 
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex items-center">
          <div className="px-4">
            <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
          </div>
          
          <div className="px-4">
            <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
          </div>
          <div className="px-4">
            <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
          </div>
          <div className="px-4">
            <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
          </div>
          {userRole === 'Admin' ? (
            <div className="px-1">
              <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
            </div>
          ) : (
            <div className="relative px-0">
              <button 
                onClick={toggleDropdown} 
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                myAutoSavy
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link 
                    to="/my-orders" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    My Orders
                  </Link>
                  <Link 
                    to="/my-reviews" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    My Reviews
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="px-3">
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
        const response = await fetch('https://auto-spare.onrender.com/services');
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
      const response = await fetch('https://auto-spare.onrender.com/services', {
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
      const response = await fetch(`https://auto-spare.onrender.com/services/${serviceId}`, {
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
