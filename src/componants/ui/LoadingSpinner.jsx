import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="text-center">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <img src="/src/assets/logo.png" alt="EarthMovers Rental Logo" className="w-24 h-24 object-contain rounded-full" />
        </div>
        <div className="text-xl font-semibold text-gray-700">Loading EarthMovers Rental...</div>
        <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;