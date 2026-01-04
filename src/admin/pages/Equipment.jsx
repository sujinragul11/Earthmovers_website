import React, { useState, useEffect } from 'react';
import { FaTruck, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../componants/ui/Modal';
import { equipmentService } from '../services/equipmentService';

const AdminEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'EXCAVATOR',
    units: 1,
    available: 1,
    hourlyRate: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    operatorBata: '',
    minHours: 4,
    fuelPerHour: '',
    description: '',
    isFeatured: false,
    isActive: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    setError(null);
    const result = await equipmentService.getEquipments();
    if (result.success) {
      setEquipment(result.data);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  // Modal functions
  const openAddModal = () => {
    setEditingEquipment(null);
    setFormData({
      name: '',
      category: 'EXCAVATOR',
      units: 1,
      available: 1,
      hourlyRate: '',
      dailyRate: '',
      weeklyRate: '',
      monthlyRate: '',
      operatorBata: '',
      minHours: 4,
      fuelPerHour: '',
      description: '',
      isFeatured: false,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingEquipment(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'EXCAVATOR',
      units: item.units || 1,
      available: item.available || 1,
      hourlyRate: item.hourlyRate || '',
      dailyRate: item.dailyRate || '',
      weeklyRate: item.weeklyRate || '',
      monthlyRate: item.monthlyRate || '',
      operatorBata: item.operatorBata || '',
      minHours: item.minHours || 4,
      fuelPerHour: item.fuelPerHour || '',
      description: item.description || '',
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEquipment(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let result;
      if (editingEquipment) {
        // Update existing equipment
        result = await equipmentService.updateEquipment(editingEquipment.id, formData);
        if (result.success) {
          setEquipment(prev => prev.map(item => 
            item.id === editingEquipment.id 
              ? result.data
              : item
          ));
        }
      } else {
        // Add new equipment
        result = await equipmentService.createEquipment(formData);
        if (result.success) {
          setEquipment(prev => [...prev, result.data]);
        }
      }
      
      if (result.success) {
        closeModal();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving equipment:', error);
      alert('Error saving equipment');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      const result = await equipmentService.deleteEquipment(id);
      if (result.success) {
        setEquipment(prev => prev.filter(item => item.id !== id));
      } else {
        alert('Error: ' + result.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Equipment Management</h1>
        <button 
          onClick={openAddModal}
          className="btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Equipment</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Units
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hourly Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipment.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaTruck className="text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      {item.description && <div className="text-sm text-gray-500">{item.description.substring(0, 30)}...</div>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.available}/{item.units}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{item.hourlyRate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Equipment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
        size="large"
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter equipment name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select category</option>
                <option value="EXCAVATOR">Excavator</option>
                <option value="LOADER">Loader</option>
                <option value="TRUCK">Truck</option>
                <option value="CRANE">Crane</option>
                <option value="GRADER">Grader</option>
                <option value="COMPACTOR">Compactor</option>
                <option value="MIXER">Mixer</option>
                <option value="DOZER">Dozer</option>
                <option value="FORKLIFT">Forklift</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.units}
                onChange={(e) => setFormData({...formData, units: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Number of units"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Units *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.available}
                onChange={(e) => setFormData({...formData, available: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Available units"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter hourly rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Rate (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.dailyRate}
                onChange={(e) => setFormData({...formData, dailyRate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter daily rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Rate (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.weeklyRate}
                onChange={(e) => setFormData({...formData, weeklyRate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter weekly rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rate (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.monthlyRate}
                onChange={(e) => setFormData({...formData, monthlyRate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter monthly rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operator Bata (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.operatorBata}
                onChange={(e) => setFormData({...formData, operatorBata: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Operator daily wage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Hours
              </label>
              <input
                type="number"
                min="1"
                value={formData.minHours}
                onChange={(e) => setFormData({...formData, minHours: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Minimum rental hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Per Hour (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fuelPerHour}
                onChange={(e) => setFormData({...formData, fuelPerHour: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fuel cost per hour"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured Equipment</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter equipment description"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? 'Saving...' : (editingEquipment ? 'Update Equipment' : 'Add Equipment')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminEquipment;