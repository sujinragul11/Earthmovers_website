import React, { useState } from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';

const Topbar = () => {
  const { user } = useAuth();
  const [notifications] = useState([
    { id: 1, title: 'New contact form submission', time: '5 min ago', read: false },
    { id: 2, title: 'Website traffic spike', time: '1 hour ago', read: true },
    { id: 3, title: 'Equipment maintenance due', time: '2 hours ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary">
                <FaBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                )}
              </button>
            </div>

            {/* User dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=Admin&background=1E40AF&color=fff'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;