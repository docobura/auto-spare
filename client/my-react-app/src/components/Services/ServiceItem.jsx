import React from 'react';
import { Link } from 'react-router-dom';
import { FaWrench, FaOilCan, FaCogs, FaCarCrash, FaSprayCan, FaAlignCenter, FaServicestack, FaCloudMeatball } from 'react-icons/fa';

const icons = {
  collisionRepairs: FaCarCrash,
  oilChanges: FaOilCan,
  brakes: FaCogs,
  sprayPainting: FaSprayCan,
  wheelAlignment: FaAlignCenter,
  carServicing: FaServicestack,
  exhausts: FaCloudMeatball,
};

const ServiceItem = ({ icon, label, imageUrl }) => {
  const IconComponent = icons[icon];
  return (
    <Link to={`/service-appointment?icon=${icon}&label=${label}&imageUrl=${encodeURIComponent(imageUrl)}`}>
      <article className="flex flex-col items-start self-start mt-4 max-w-[300px] cursor-pointer">
        <img loading="lazy" src={imageUrl} alt={label} className="object-contain self-stretch w-full h-[200px] rounded-[20px]" />
        <div className="flex items-center gap-2 mt-2.5 text-xl">
          {IconComponent ? <IconComponent className="text-xl" /> : null}
          <h3 className="text-2xl">{label}</h3>
        </div>
      </article>
    </Link>
  );
};

export default ServiceItem;
