import React from 'react';
import { FaWrench, FaOilCan, FaCogs, FaCarCrash, FaSprayCan, FaAlignCenter, FaServicestack, FaCloudMeatball } from 'react-icons/fa'; // Updated

const icons = {
  collisionRepairs: FaCarCrash,
  oilChanges: FaOilCan,
  brakes: FaCogs,
  sprayPainting: FaSprayCan,
  wheelAlignment: FaAlignCenter,
  carServicing: FaServicestack,
  exhausts: FaCloudMeatball, // Updated
};

const ServiceItem = ({ icon, label, onClick }) => {
  const IconComponent = icons[icon];
  console.log('Rendering ServiceItem:', { icon, label }); // Debugging message
  return (
    <div className="flex items-center space-x-2 p-4 border rounded-md shadow-sm hover:shadow-lg cursor-pointer" onClick={onClick}>
      {IconComponent ? <IconComponent className="text-xl" /> : null}
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
};

export default ServiceItem;
