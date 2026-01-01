import React from 'react';
import { MdBuild } from 'react-icons/md';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <MdBuild className="text-6xl text-primary animate-bounce mx-auto mb-4" />
        <div className="text-xl font-semibold text-gray-700">Loading EarthMovers Rental...</div>
        <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;