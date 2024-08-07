import React from 'react';
import ServiceItem from './ServiceItem';
import { Link } from 'react-router-dom';

const services = [
  { icon: 'collisionRepairs', label: 'Collision Repairs', imageUrl: 'https://www.shutterstock.com/image-photo/mechanic-garage-auto-workshop-team-600nw-2293582995.jpg' },
  { icon: 'oilChanges', label: 'Oil Changes', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DTOs5w8Un3W4kWsspqENKlqOWlxkUrTLcQ&s' },
  { icon: 'brakes', label: 'Brakes', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStLECbVQ-3_w7pwbQuwo2hA23wZMqEJVGW7g&s' },
  { icon: 'sprayPainting', label: 'Spray Painting', imageUrl: 'https://3.imimg.com/data3/SE/WA/MY-4085616/car-painting-spray-500x500.jpg' },
  { icon: 'wheelAlignment', label: 'Wheel Alignment', imageUrl: 'https://www.torqueautomotive.net/Files/EmailCampaigns/AdobeStock_512154168.jpeg' },
  { icon: 'carServicing', label: 'Car Servicing', imageUrl: 'https://lh3.googleusercontent.com/bArL90uD_vyG4TqICOkg_qd21QyjY1haL0n-5hl50UOuFI5A2wcX_kEdWV9nGKn-txaU9OcbNpsDwuYVs_Zvxzs=s1200' },
  { icon: 'exhausts', label: 'Exhausts', imageUrl: 'https://heathtyresautocentre.co.uk/wp-content/uploads/2021/12/exhausts-cardiff.jpg' },
];

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

const ServiceList = ({ onServiceSelect }) => {
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col pt-[72px]"> {/* Adjust padding-top to ensure space for the header */}
      <Header />
      <section className="flex flex-col items-center px-10 pt-14 pb-32 w-full bg-gray-800 text-white">
        <div className="flex flex-col w-full max-w-[1080px]">
          <h2 className="self-center text-3xl text-center">Our Services:</h2>
          <div className="flex flex-wrap gap-5 justify-between mt-9">
            {services.map((service, index) => (
              <ServiceItem 
                key={index} 
                icon={service.icon} 
                label={service.label} 
                imageUrl={service.imageUrl} 
                onClick={() => onServiceSelect(service)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceList;
