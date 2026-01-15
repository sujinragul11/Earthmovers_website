import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const services = [
    'Excavator Rental',
    'Loader Rental',
    'Dumper Rental',
    'Crane Rental',
    'Operator Service',
    'Project Consultation',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <MdBuild className="text-3xl text-secondary" />
              <h2 className="text-2xl font-heading font-bold">EarthMovers<span className="text-primary">Rental</span></h2>
            </div>
            <p className="text-gray-400 mb-6">
              Providing reliable earthmoving equipment rental services with skilled operators for construction projects across India.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              
             
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+919150503525" className="text-gray-400 hover:text-primary">
                    +91 91505 03525
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:sivaearthmoverscbe@gmail.com" className="text-gray-400 hover:text-primary">
                    sivaearthmoverscbe@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-400">
                     2/435/2 Thiruvalluvar Nagar, Somaiyanur road, <br />
                     coimbatore -641108
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Button for Desktop */}
        <div className="hidden lg:block fixed bottom-6 right-6 z-40">
          <a
            href="https://wa.me/919150503525"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 animate-bounce"
          >
            <FaWhatsapp className="text-2xl" />
            <span className="font-semibold">Chat on WhatsApp</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} EarthMoversRental. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed and developed for construction excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;