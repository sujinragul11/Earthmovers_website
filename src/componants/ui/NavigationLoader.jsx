import React from 'react';

const NavigationLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-100">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="w-full h-full rounded-full border-4 border-white shadow-lg animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/src/assets/logo.png" alt="EarthMovers Rental Logo" className="w-24 h-24 object-contain rounded-full" />
          </div>
        </div>
        <div className="text-xl font-semibold text-gray-700">Navigating...</div>
      </div>
    </div>
  );
};

export default NavigationLoader;
