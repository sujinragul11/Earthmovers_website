import React from 'react';

const Card = ({ children, className = '', hover = true, padding = true }) => {
  return (
    <div className={`
      bg-white rounded-xl shadow-lg overflow-hidden
      ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''}
      ${padding ? 'p-6' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`pb-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;