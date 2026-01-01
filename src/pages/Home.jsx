import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../componants/layout/Layout';
import EquipmentCard from '../componants/shared/EquipmentCard';
import { FaPhone, FaWhatsapp, FaShieldAlt, FaRupeeSign, FaHeadset, FaTools, FaUser } from 'react-icons/fa';
import { MdBuild, MdLocationCity } from 'react-icons/md';
import { fleetData } from '../data/fleetData';
import { WHY_CHOOSE_US } from '../utils/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import planImage from '../assets/Plan.png';

const Home = () => {
  const featuredEquipment = fleetData.slice(0, 4);

  return (
    <Layout seoProps={{
      title: "Reliable Earthmovers Rental Services",
      description: "Get modern earthmoving equipment with skilled operators for your construction projects. Transparent pricing, 24/7 support.",
      keywords: "earthmoving equipment rental, excavator rental, construction equipment hire"
    }}>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${planImage})`,
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="container-custom relative z-20 px-4">
          <div className="max-w-3xl text-white animate-slide-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Reliable <span className="text-secondary">Earthmovers</span> Rental Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Modern equipment, skilled operators, and transparent pricing for all your construction needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/fleet" className="btn-primary text-lg px-8 py-4">
                View Our Fleet
              </Link>
              <Link to="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                Get Free Quote
              </Link>
              <a 
                href="tel:+919876543210" 
                className="flex items-center space-x-2 bg-white text-gray-900 font-semibold py-4 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                <FaPhone />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With 15+ years of experience, we provide reliable earthmoving solutions for projects of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <div key={index} className="card text-center p-8 hover:border-primary hover:border-2 transition-all duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MdBuild className="text-5xl mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">17+</div>
              <p className="text-lg">Modern Machines</p>
            </div>
            <div>
              <FaUser className="text-5xl mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">30+</div>
              <p className="text-lg">Skilled Operators</p>
            </div>
            <div>
              <MdLocationCity className="text-5xl mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="text-lg">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Equipment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our well-maintained fleet of modern earthmoving equipment
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {featuredEquipment.map((equipment) => (
              <SwiperSlide key={equipment.id}>
                <EquipmentCard equipment={equipment} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <Link to="/fleet" className="btn-primary text-lg px-8 py-3">
              View All Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Detailed */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Trusted Partner for Earthmoving Solutions
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaShieldAlt className="text-2xl text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                    <p className="text-gray-600">
                      All equipment undergoes regular safety checks and operators are trained in safety protocols.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaRupeeSign className="text-2xl text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                    <p className="text-gray-600">
                      No hidden charges. Get clear breakdowns of equipment rental, operator charges, and fuel costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaHeadset className="text-2xl text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock technical support and emergency services to keep your project running smoothly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaTools className="text-2xl text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Equipment</h3>
                    <p className="text-gray-600">
                      Well-maintained modern machines with regular servicing and maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/construction-site.jpg"
                alt="Construction Site"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-lg font-semibold">Years Experience</div>
                <p className="text-gray-600 text-sm mt-2">
                  Serving construction industry since 2008
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the right equipment with skilled operators for your construction needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <FaWhatsapp />
              <span>WhatsApp Quote</span>
            </a>
            <a
              href="tel:+919876543210"
              className="btn-outline text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
            >
              Call Now: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;