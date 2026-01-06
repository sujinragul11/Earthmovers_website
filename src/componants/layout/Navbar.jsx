import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <nav className="container-custom px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <MdBuild className="text-3xl text-secondary" />
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900">EarthMovers<span className="text-primary">Rental</span></h1>
                <p className="text-xs text-gray-600">Heavy Equipment Solutions</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Call to Action */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-2 text-primary hover:text-primary-dark font-semibold"
              >
                <FaPhone />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2 bg-green-500 hover:bg-green-600"
              >
                <FaWhatsapp />
                <span>Get Quote</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `font-medium py-2 ${
                        isActive
                          ? 'text-primary border-l-4 border-primary pl-3'
                          : 'text-gray-700 hover:text-primary hover:border-l-4 hover:border-primary hover:pl-3'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-4 border-t">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center space-x-2 text-primary font-semibold py-2"
                  >
                    <FaPhone />
                    <span>+91 98765 43210</span>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full flex items-center justify-center space-x-2 mt-2"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Floating Buttons */}
      <div className="md:hidden fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
        <a
          href="tel:+919876543210"
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg"
        >
          <FaPhone className="text-2xl" />
        </a>
      </div>
    </>
  );
};

export default Navbar;