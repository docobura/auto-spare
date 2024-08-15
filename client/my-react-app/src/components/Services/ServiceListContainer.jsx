import React, { useEffect, useState } from "react";
import ServiceList from "./ServiceList";
import { useAuth } from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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

const ServiceListContainer = () => {
  const [services, setServices] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://auto-spare.onrender.com/services", {
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
    <div className="h-screen w-screen bg-gray-400"> 
      <Header />
      
      <section className="bg-cover bg-center h-[60vh]" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1347150429/photo/professional-mechanic-working-on-the-engine-of-the-car-in-the-garage.jpg?s=612x612&w=0&k=20&c=5zlDGgLNNaWsp_jq_L1AsGT85wrzpdl3kVH-75S-zTU=')" }}>
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white pt-20">
            <h2 className="text-3xl font-bold">Comprehensive Car Check-Ups</h2>
            <p className="mt-4 max-w-2xl mx-auto font-medium text-2xl">
              Our free 30-point car inspection service is the perfect way to make sure your car is in tip-top shape.
            </p>
            <p className="mt-2 max-w-2xl mx-auto text-2xl">
              Our experienced and certified technicians can even provide a digital car diagnosis if needed, helping keep you safe on the road.
            </p>
          </div>
        </div>
      </section>
      <section className="services-section bg-gray-400">
      <div className="">
        <ServiceList services={services} />
      </div>
      </section>
      <section className="bg-cover bg-center h-[50vh]">
  <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
    <div className="text-center text-white pt-20">
      <h2 className="text-4xl font-bold">Why Choose Us</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354V15m0 0V9m0 6h3m-6 0h3m4.24-6.854A9 9 0 1112 3.08V9h2m-4 0h2V3.08A9 9 0 0117.24 8.146m.757 4.57A8.975 8.975 0 0112 21.354V15h2m-4 0h2v6.354A8.975 8.975 0 017.24 12.715a9.001 9.001 0 0110.997-.002z"></path>
          </svg>
          <h3 className="text-2xl font-semibold">Highly Trained Staff</h3>
          <p className="mt-2 text-lg">Our team consists of certified and experienced professionals.</p>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3-3 4 4m0 0l4-4 3 3m-7 7h7m-10-6l-4 4 3 3m4-4l4-4"></path>
          </svg>
          <h3 className="text-2xl font-semibold">Excellent Customer Service</h3>
          <p className="mt-2 text-lg">We prioritize customer satisfaction with prompt and courteous service.</p>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v7h7m0 0v6m0 0H5m0 0v6M5 4h14M2 16l3-3m17 0l-3 3m-3 7a4 4 0 00-8 0"></path>
          </svg>
          <h3 className="text-2xl font-semibold">Affordable Prices</h3>
          <p className="mt-2 text-lg">We offer competitive pricing without compromising on quality.</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default ServiceListContainer;
