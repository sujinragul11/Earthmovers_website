import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaImages, FaTools, FaProjectDiagram, FaCertificate } from 'react-icons/fa';
import Layout from '../componants/layout/Layout';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('equipment');

  // Sample gallery data - you can replace with actual images
  const galleryData = {
    equipment: [
      {
        id: 1,
        title: 'Caterpillar D6 Dozer',
        image: '/api/placeholder/400/300',
        category: 'Bulldozers'
      },
      {
        id: 2,
        title: 'Komatsu PC200 Excavator',
        image: '/api/placeholder/400/300',
        category: 'Excavators'
      },
      {
        id: 3,
        title: 'Volvo L120 Loader',
        image: '/api/placeholder/400/300',
        category: 'Loaders'
      },
      {
        id: 4,
        title: 'CAT 320 Excavator',
        image: '/api/placeholder/400/300',
        category: 'Excavators'
      },
      {
        id: 5,
        title: 'John Deere 844K Loader',
        image: '/api/placeholder/400/300',
        category: 'Loaders'
      },
      {
        id: 6,
        title: 'Caterpillar 140M Grader',
        image: '/api/placeholder/400/300',
        category: 'Graders'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Highway Construction Project',
        image: '/api/placeholder/400/300',
        description: 'Major highway expansion project completed in 2023'
      },
      {
        id: 2,
        title: 'Commercial Building Foundation',
        image: '/api/placeholder/400/300',
        description: 'Large commercial complex foundation work'
      },
      {
        id: 3,
        title: 'Residential Development',
        image: '/api/placeholder/400/300',
        description: 'Subdivision earthwork and grading'
      },
      {
        id: 4,
        title: 'Bridge Construction',
        image: '/api/placeholder/400/300',
        description: 'Bridge approach and foundation preparation'
      },
      {
        id: 5,
        title: 'Mining Operation',
        image: '/api/placeholder/400/300',
        description: 'Large-scale mining site preparation'
      },
      {
        id: 6,
        title: 'Land Clearing Project',
        image: '/api/placeholder/400/300',
        description: 'Forest clearing and land development'
      }
    ],
    certifications: [
      {
        id: 1,
        title: 'ISO 9001 Certification',
        image: '/api/placeholder/400/300',
        description: 'Quality Management Systems Certification'
      },
      {
        id: 2,
        title: 'Safety Excellence Award',
        image: '/api/placeholder/400/300',
        description: 'Recognized for outstanding safety record'
      },
      {
        id: 3,
        title: 'Equipment Maintenance Certification',
        image: '/api/placeholder/400/300',
        description: 'Certified equipment maintenance procedures'
      },
      {
        id: 4,
        title: 'Environmental Compliance',
        image: '/api/placeholder/400/300',
        description: 'Environmental protection and compliance'
      }
    ]
  };

  const tabs = [
    { id: 'equipment', label: 'Equipment', icon: FaTools },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'certifications', label: 'Certifications', icon: FaCertificate }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Gallery - EarthMovers Rental | Equipment, Projects & Certifications</title>
        <meta name="description" content="Explore our comprehensive gallery showcasing heavy equipment, completed projects, and industry certifications at EarthMovers Rental." />
        <meta name="keywords" content="equipment gallery, construction projects, heavy machinery, certifications, EarthMovers Rental" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-custom text-center">
          <FaImages className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our comprehensive collection of equipment, completed projects, and industry certifications
          </p>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 mx-2 mb-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData[activeTab].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {item.category}
                    </span>
                  )}
                  {item.description && (
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Work With Us?
              </h2>
              <p className="text-gray-600 mb-6">
                See our equipment in action and explore our completed projects.
                Contact us today to discuss your heavy equipment rental needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/fleet"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  View Our Fleet
                </a>
                <a
                  href="/contact"
                  className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;