import React from 'react';

const StatsCard = ({ title, value, icon: Icon, change, changeType = 'positive', description }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-md bg-primary bg-opacity-10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-semibold text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
        {change && (
          <div className="mt-4">
            <div className={`flex items-center text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'positive' ? '↑' : '↓'}
              <span className="ml-1 font-medium">{change}</span>
              <span className="ml-2 text-gray-500">{description}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;