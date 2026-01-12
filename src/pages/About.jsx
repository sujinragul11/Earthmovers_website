import React from 'react';
import Layout from '../componants/layout/Layout';
import { FaAward, FaUsers, FaShieldAlt, FaHandshake, FaEye, FaStar, FaUserCheck, FaMedal } from 'react-icons/fa';
import { GiDuration, GiTargetPrize } from 'react-icons/gi';

const About = () => {
  const values = [
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Reliability",
      description: "On-time delivery and consistent performance"
    },
    {
      icon: <FaEye className="text-3xl" />,
      title: "Transparency",
      description: "Clear pricing and honest communication"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Quality",
      description: "Well-maintained equipment and skilled operators"
    },
    {
      icon: <FaUserCheck className="text-3xl" />,
      title: "Customer First",
      description: "Tailored solutions for your specific needs"
    }
  ];

  const safetyFeatures = [
    "Regular equipment safety inspections",
    "Operator safety training and certification",
    "Personal protective equipment provided",
    "Emergency response protocols",
    "Daily safety briefings",
    "Insurance coverage for all operations"
  ];

  return (
    <Layout seoProps={{
      title: "About Us - Earthmoving Equipment Rental Company",
      description: "Learn about our 15+ years of experience in providing reliable earthmoving equipment rental services with skilled operators.",
      keywords: "about earthmovers rental, company history, team strength, safety commitment"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#C0C0C0]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6  text-gray-900">
            About EarthMovers Rental
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            With over 28 years of experience, we are your trusted partner for reliable earthmoving solutions across India.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-[#808080]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-black">Our Story</h2>

              <div className="space-y-4 text-gray-900 font-bold">
                <p>
                  Founded in 1998, EarthMovers Rental began with a single excavator and a vision to provide reliable construction equipment rental services. What started as a small family business has grown into one of the region's most trusted earthmoving equipment providers.
                </p>
                <p>
                  Our journey has been marked by steady growth, driven by our commitment to quality equipment, skilled operators, and exceptional customer service. We've expanded our fleet from one machine to over 17 modern earthmovers, serving projects ranging from small residential constructions to major infrastructure developments.
                </p>
                <p>
                  Today, we proudly serve construction companies, government projects, and individual contractors across multiple states, maintaining our founding principles of reliability, transparency, and customer satisfaction.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">28+</div>
                  <div className="text-white">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">17+</div>
                  <div className="text-white">Modern Machines</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">30+</div>
                  <div className="text-white">Skilled Operators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-white">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/about-team.jpg"
                alt="Our Team"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <FaAward className="text-4xl text-secondary mb-3" />
                <div className="text-xl font-bold">Certified Operators</div>
                <p className="text-gray-900 text-sm mt-1">
                  All operators undergo rigorous training and certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team Strength */}
      <section className="section-padding bg-[#C0C0C0]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Team Strength</h2>
            <p className="text-gray-900 max-w-2xl mx-auto font-bold">
              Our greatest asset is our team of skilled professionals dedicated to your project's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 bg-white">
              <div className="flex items-center mb-6">
                <FaUsers className="text-4xl text-primary mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-black">30+ Skilled Operators</h3>
                  <p className="text-gray-600">Certified and experienced professionals</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <GiDuration className="text-secondary mr-3" />
                  <span>Minimum 5 years of field experience</span>
                </div>
                <div className="flex items-center">
                  <FaMedal className="text-secondary mr-3" />
                  <span>Regular training and skill upgrades</span>
                </div>
                <div className="flex items-center">
                  <GiTargetPrize className="text-secondary mr-3" />
                  <span>Specialized equipment operation skills</span>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-white">
              <div className="flex items-center mb-6">
                <FaShieldAlt className="text-4xl text-accent mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-black">Safety & Training</h3>
                  <p className="text-gray-600">Comprehensive safety protocols</p>
                </div>
              </div>

              <div className="space-y-3 text-gray-700">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-[#808080]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Our Core Values</h2>
            <p className="text-gray-900 font-bold max-w-2xl mx-auto">
              The principles that guide our operations and define our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  ">
            {values.map((value, index) => (
              <div
                key={index}
                className="card text-center p-8 bg-white hover:border-primary hover:border-2 transition-all duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">
                  {value.title}
                </h3>
                <p className="text-gray-900">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-[#C0C0C0]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h3>
              <p className="text-lg text-gray-800">
                To provide reliable, efficient, and safe earthmoving solutions that empower construction projects of all scales, while maintaining the highest standards of equipment maintenance and operator expertise.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Vision</h3>
              <p className="text-lg text-gray-800">
                To become India's most trusted earthmoving equipment rental partner, recognized for our commitment to safety, transparency, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;