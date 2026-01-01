import React, { useState } from 'react';
import Layout from '../componants/layout/Layout';
import PricingTable from '../componants/shared/PricingTable';
import { pricingData } from '../data/pricingData';
import { FaCalculator, FaGasPump, FaHardHat, FaClock, FaPhoneAlt } from 'react-icons/fa';
import { formatCurrency, calculateRentalCost } from '../utils/helpers';

const Pricing = () => {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [hours, setHours] = useState(8);
  const [calculation, setCalculation] = useState(null);

  const equipmentOptions = pricingData.map(item => ({
    value: item.id,
    label: item.equipment,
    hourlyRate: item.hourlyRate,
    operatorBata: item.operatorBata,
    minHours: item.minHours
  }));

  const handleCalculate = () => {
    if (!selectedEquipment) {
      alert('Please select equipment');
      return;
    }

    const selected = equipmentOptions.find(e => e.value.toString() === selectedEquipment);
    if (!selected) return;

    const totalHours = Math.max(hours, selected.minHours);
    const totalCost = calculateRentalCost(selected.hourlyRate, totalHours, selected.operatorBata);
    
    setCalculation({
      equipment: selected.label,
      hours: totalHours,
      hourlyRate: selected.hourlyRate,
      operatorBata: selected.operatorBata,
      totalCost: totalCost,
      costPerHour: Math.round(totalCost / totalHours)
    });
  };

  return (
    <Layout seoProps={{
      title: "Rental Pricing - Transparent Equipment Rates",
      description: "Get transparent pricing for our earthmoving equipment rental. View hourly rates, operator charges, and calculate your project cost.",
      keywords: "equipment rental pricing, hourly rates, cost calculator, operator charges"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear and competitive rates for all our earthmoving equipment rental services
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="card p-8 max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <FaCalculator className="text-3xl text-primary mr-3" />
                <h2 className="text-2xl font-bold">Quick Cost Calculator</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="label">Select Equipment</label>
                  <select
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Choose equipment</option>
                    {equipmentOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} (₹{option.hourlyRate}/hour)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Hours Needed</label>
                  <input
                    type="number"
                    min="4"
                    max="720"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value) || 4)}
                    className="input-field"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 4 hours per equipment
                  </p>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleCalculate}
                    className="btn-primary w-full py-3"
                  >
                    Calculate Cost
                  </button>
                </div>
              </div>

              {calculation && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Cost Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Equipment:</span>
                          <span className="font-semibold">{calculation.equipment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hours:</span>
                          <span className="font-semibold">{calculation.hours} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hourly Rate:</span>
                          <span className="font-semibold">₹{calculation.hourlyRate}/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Operator Charges:</span>
                          <span className="font-semibold">₹{calculation.operatorBata}/day</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-500">Estimated Cost</div>
                        <div className="text-3xl font-bold text-primary">
                          {formatCurrency(calculation.totalCost)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Approximately ₹{calculation.costPerHour}/hour
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        *Excluding fuel charges. Contact for exact quotation.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Detailed Pricing Table</h2>
            <PricingTable data={pricingData} />
          </div>

          {/* Pricing Notes */}
          <div className="mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">Important Pricing Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaGasPump className="mr-3 text-secondary" />
                    Fuel Charges
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fuel charges are billed separately</li>
                    <li>• Can be arranged by us at market rate</li>
                    <li>• Client can supply their own fuel</li>
                    <li>• Daily consumption tracking available</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaHardHat className="mr-3 text-secondary" />
                    Operator Charges
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Operator bata: ₹400/day (8 hours)</li>
                    <li>• Overtime: ₹50/hour after 8 hours</li>
                    <li>• Skilled and certified operators</li>
                    <li>• Safety equipment provided</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaClock className="mr-3 text-secondary" />
                  Booking Terms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Minimum Booking</div>
                    <div className="text-xl font-bold text-primary">4 Hours</div>
                    <div className="text-sm text-gray-600">Per equipment per day</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Monthly Discount</div>
                    <div className="text-xl font-bold text-primary">Up to 15%</div>
                    <div className="text-sm text-gray-600">For long-term rentals</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Payment Terms</div>
                    <div className="text-xl font-bold text-primary">Flexible</div>
                    <div className="text-sm text-gray-600">Daily/weekly/monthly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Custom Pricing?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Get a personalized quotation for your specific project requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919876543210"
                className="btn-secondary px-8 py-3 flex items-center space-x-2"
              >
                <FaPhoneAlt />
                <span>Call for Quote</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;