import React from 'react';
import { FaCheckCircle, FaHardHat } from 'react-icons/fa';

const EquipmentCard = ({ equipment }) => {
  return (
    <div className="card group hover:border-primary hover:border-2 transition-all duration-300">
      {/* Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full   object-top group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            {equipment.category}
          </span>
        </div>
        {/* Units Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            {equipment.units} Units
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
          {equipment.name}
        </h3>
        
        {/* Specifications */}
        <div className="space-y-2 mb-4">
          {equipment.specs.map((spec, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <FaCheckCircle className="text-primary mr-2" />
              {spec}
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          {equipment.features?.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full"
            >
              <FaHardHat className="mr-1" />
              {feature}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-primary">
              ₹{equipment.hourlyRate}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </p>
          </div>
          <button className="btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;