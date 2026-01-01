import React from 'react';
import { FaGasPump, FaHardHat, FaClock } from 'react-icons/fa';

const PricingTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Equipment
            </th>
            <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Hourly Rate (₹)
            </th>
            <th className="px 6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Operator Bata (₹/day)
            </th>
            <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Min. Hours
            </th>
            <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-gray-900 uppercase tracking-wider">
              Total/Hour (₹)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr 
              key={item.id} 
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-gray-900">
                  {item.equipment}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  item.category === 'Excavator' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'Loader' ? 'bg-green-100 text-green-800' :
                  item.category === 'Truck' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-lg font-bold text-primary">
                  ₹{item.hourlyRate}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-gray-700">
                  <FaHardHat className="mr-2 text-secondary" />
                  ₹{item.operatorBata}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-gray-700">
                  <FaClock className="mr-2 text-accent" />
                  {item.minHours} hrs
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-lg font-bold text-gray-900">
                  ₹{item.hourlyRate + item.operatorBata / 8}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pricing Notes */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FaGasPump className="mr-2 text-gray-500" />
            <span>Fuel charges extra</span>
          </div>
          <div className="flex items-center">
            <FaHardHat className="mr-2 text-gray-500" />
            <span>Operator bata separate</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            <span>Minimum 4 hours booking</span>
          </div>
          <div className="ml-auto">
            <span className="font-semibold">Contact for monthly rates & discounts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;