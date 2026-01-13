import React, { useState, useEffect } from 'react';
import Layout from '../componants/layout/Layout';
import EquipmentCard from '../componants/shared/EquipmentCard';
import AnimatedCountUp from '../componants/ui/CountUp';
import { fleetData, categories } from '../data/fleetData';
import { FaFilter, FaTruck, FaHardHat, FaCheckCircle } from 'react-icons/fa';
import { MdBuild, MdSettings } from 'react-icons/md';
import { getEquipmentCountByCategory } from '../utils/helpers';

const Fleet = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEquipment, setFilteredEquipment] = useState(fleetData);
  const [equipmentCounts, setEquipmentCounts] = useState({});

  useEffect(() => {
    const counts = getEquipmentCountByCategory(fleetData);
    setEquipmentCounts(counts);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEquipment(fleetData);
    } else {
      setFilteredEquipment(
        fleetData.filter(equipment =>
          equipment.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'excavator': return <MdBuild className="text-xl" />;
      case 'loader': return <FaTruck className="text-xl" />;
      case 'truck': return <FaTruck className="text-xl" />;
      case 'crane': return <FaHardHat className="text-xl" />;
      default: return <MdSettings className="text-xl" />;
    }
  };

  const totalUnits = Object.values(equipmentCounts).reduce((sum, count) => sum + count, 0);

  return (
    <Layout seoProps={{
      title: "Our Fleet - Earthmoving Equipment",
      description: "Browse our extensive fleet of modern earthmoving equipment including excavators, loaders, trucks, cranes and more.",
      keywords: "equipment fleet, excavator rental, construction machinery, heavy equipment"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#C0C0C0]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Our Equipment Fleet
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Modern, well-maintained earthmoving equipment ready for your construction projects
          </p>
        </div>
      </section>


      {/* Stats Banner */}
      <div className="bg-[#808080] text-white py-6">

        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{fleetData.length}</div>
              <div className="text-sm font-semibold">Equipment Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold ">{totalUnits}</div>
              <div className="text-sm font-semibold">Total Units Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold"><AnimatedCountUp end={30} /></div>
              <div className="text-sm font-semibold">Skilled Operators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm font-semibold">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Filter */}
      <section className="section-padding bg-[#C0C0C0]" >
        <div className="container-custom">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center text-black">
                <FaFilter className="mr-3 text-white" />
                Filter by Category
              </h2>
              <div className="text-lg font-semibold text-black">
                Total: {totalUnits} Machines Available
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {getCategoryIcon(category.name)}
                  <span>{category.name}</span>
                  {category.id !== 'all' && (
                    <span className="bg-white text-primary text-xs px-2 py-1 rounded-full">
                      {equipmentCounts[category.name] || 0}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="mb-12">
            {filteredEquipment.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-xl font-bold mb-2">No Equipment Found</h3>
                <p className="text-gray-600">We're updating our inventory. Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-8">
                {filteredEquipment.map((equipment) => (
                  <EquipmentCard key={equipment.id} equipment={equipment} />
                ))}
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="rounded-2xl p-8 bg-[#808080]" >
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Why Choose Our Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4 ">🔧</div>
                <h3 className="text-xl font-bold mb-3 text-black">Well-Maintained</h3>
                <p className="text-black">
                  Regular servicing and maintenance ensure optimal performance and reliability.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-3 text-black">Modern Technology</h3>
                <p className="text-black">
                  Latest models with advanced features for improved efficiency and safety.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-3 text-black">Safety Certified</h3>
                <p className="text-black">
                  All equipment meets safety standards and undergoes regular inspections.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-12 bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Additional Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6 bg-[#C0C0C0]">
                <div className="flex items-start space-x-4">
                  <FaHardHat className="text-2xl text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Operator Services</h3>
                    <p className="text-gray-900 font-semibold">
                      Experienced and certified operators available with all equipment rentals. All operators undergo regular training and safety certification.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Minimum 5 years experience</span>
                      </li>
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Safety certified</span>
                      </li>
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Equipment-specific training</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-[#C0C0C0]">
                <div className="flex items-start space-x-4">
                  <MdBuild className="text-2xl text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Equipment Maintenance</h3>
                    <p className="text-gray-900 font-semibold" >
                      Comprehensive maintenance services to keep your equipment running smoothly. We provide scheduled maintenance and emergency repairs.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Regular preventive maintenance</span>
                      </li>
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Emergency repair services</span>
                      </li>
                      <li className="flex items-center text-black font-bold">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>Genuine spare parts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fleet;