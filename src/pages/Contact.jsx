import React, { useState } from 'react';
import Layout from '../componants/layout/Layout';
import ContactForm from '../componants/shared/ContactForm';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { COMPANY_INFO } from '../utils/constants';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <Layout seoProps={{
      title: "Contact Us - Earthmoving Equipment Rental",
      description: "Get in touch for equipment rental inquiries, quotes, and project consultations. Call, WhatsApp, or email us today.",
      keywords: "contact earthmovers rental, equipment rental quote, project consultation, get in touch"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact us for equipment rental inquiries, quotes, and project consultations
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaPhone className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone Numbers</h3>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-primary hover:text-primary-dark font-medium block">
                      {COMPANY_INFO.phone}
                    </a>
                    <a href={`tel:+919876543211`} className="text-gray-600 hover:text-primary">
                      +91 98765 43211 (Alternate)
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Call us for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaWhatsapp className="text-xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Chat with us on WhatsApp
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Quick quotes and support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <FaEnvelope className="text-xl text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent hover:text-accent-dark font-medium">
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-sm text-gray-500 mt-2">For detailed inquiries and documents</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office Address</h3>
                    <p className="text-gray-700">{COMPANY_INFO.address}</p>
                    <p className="text-sm text-gray-500 mt-2">Visit us for detailed discussions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaClock className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Working Hours</h3>
                    <p className="text-gray-700 font-medium">{COMPANY_INFO.workingHours}</p>
                    <p className="text-sm text-gray-500 mt-2">Emergency support available</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact CTA */}
              <div className="mt-8 bg-primary/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="btn-primary w-full text-center"
                  >
                    <FaPhone className="inline mr-2" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center"
                  >
                    <FaWhatsapp className="inline mr-2" />
                    WhatsApp Now
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {formSubmitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                    <div className="flex items-center">
                      <FaWhatsapp className="mr-2" />
                      <span>Message sent successfully! You will be redirected to WhatsApp.</span>
                    </div>
                  </div>
                )}

                <ContactForm onSubmit={handleFormSubmit} />
              </div>

              {/* Response Time */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">What Happens Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">1.</div>
                    <h4 className="font-semibold mb-2">Submit Form</h4>
                    <p className="text-sm text-gray-600">
                      Fill out the contact form with your requirements
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">2.</div>
                    <h4 className="font-semibold mb-2">WhatsApp Redirect</h4>
                    <p className="text-sm text-gray-600">
                      You'll be redirected to WhatsApp for immediate response
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">3.</div>
                    <h4 className="font-semibold mb-2">Get Quote</h4>
                    <p className="text-sm text-gray-600">
                      Receive detailed quotation and availability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-96 relative">
              {/* Placeholder for Google Maps */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Our Location</h3>
                  <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  <a
                    href="https://maps.google.com/?q=Industrial+Area+Sector+62+Noida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 btn-primary"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Contact</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Need equipment urgently? Contact our emergency helpline for immediate assistance.
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center text-2xl font-bold bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <FaPhone className="mr-3" />
            Emergency: +91 98765 43210
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;