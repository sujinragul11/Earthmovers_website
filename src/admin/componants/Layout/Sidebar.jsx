import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaEye, 
  FaComments, 
  FaTruck, 
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';
import { useAuth } from '../../../contexts/AuthContext';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { name: 'Contacts', href: '/admin/contacts', icon: FaUsers },
    { name: 'Visitors', href: '/admin/visitors', icon: FaEye },
    { name: 'Messages', href: '/admin/messages', icon: FaComments },
    { name: 'Equipment', href: '/admin/equipment', icon: FaTruck },
    { name: 'Analytics', href: '/admin/analytics', icon: FaChartBar },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 bg-gray-800">
            <div className="flex items-center space-x-2">
              <MdBuild className="text-2xl text-secondary" />
              <div>
                <h1 className="text-lg font-bold text-white">EarthMovers</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 py-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=Admin&background=1E40AF&color=fff'}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FaSignOutAlt className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;