import React, { useState, useEffect } from 'react';
import DataTable from '../componants/ui/DataTable';
import Modal from '../../componants/ui/Modal';
import { contactService } from '../services/contactService';
import { FaFilter, FaDownload, FaUserPlus, FaPhone, FaEnvelope, FaWhatsapp, FaEdit, FaEye } from 'react-icons/fa';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    source: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    status: 'new',
    source: 'website'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await contactService.getContacts(filters);
      const statsResult = await contactService.getStats();
      
      if (result.success && Array.isArray(result.data)) {
        setContacts(result.data);
        setFilteredContacts(result.data);
      } else {
        setContacts([]);
        setFilteredContacts([]);
      }
      
      if (statsResult.success) {
        setStats({
          total: statsResult.data.total || 0,
          new: statsResult.data.newLeads || 0,
          contacted: statsResult.data.contacted || 0,
          converted: statsResult.data.converted || 0
        });
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setFilteredContacts([]);
      setStats({
        total: 0,
        new: 0,
        contacted: 0,
        converted: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { 
      key: 'contact', 
      header: 'Contact Info',
      render: (item) => (
        <div>
          <div className="font-medium">{item.phone}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    { key: 'company', header: 'Company' },
    { key: 'subject', header: 'Subject' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          item.status === 'new' ? 'bg-green-100 text-green-800' :
          item.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
          item.status === 'quoted' ? 'bg-yellow-100 text-yellow-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {item.status}
        </span>
      )
    },
    { key: 'source', header: 'Source' },
    { 
      key: 'createdAt', 
      header: 'Date',
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    },
    { 
      key: 'assignedTo', 
      header: 'Assigned To',
      render: (item) => item.assignedTo || 'Unassigned'
    }
  ];

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await contactService.updateContactStatus(id, newStatus);
      fetchContacts(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        fetchContacts(); // Refresh data
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  // Modal functions
  const openAddModal = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      status: 'new',
      source: 'website'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      company: contact.company || '',
      subject: contact.subject || '',
      message: contact.message || '',
      status: contact.status || 'new',
      source: contact.source || 'website'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingContact) {
        // Update existing contact
        await contactService.updateContactStatus(editingContact.id, formData.status, null);
        // Note: In a full implementation, you'd have a separate update API
      } else {
        // This would normally call a backend API to create contact
        // For now, we'll just show it works
        console.log('Creating contact:', formData);
      }
      
      fetchContacts();
      closeModal();
    } catch (error) {
      console.error('Error saving contact:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    // In production, this would generate a CSV/Excel file
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `contacts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600">Manage all customer inquiries and leads</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
          <button 
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaUserPlus className="mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <FaUserPlus className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <FaEnvelope className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.new}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <FaPhone className="text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.contacted}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <FaWhatsapp className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Converted</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.converted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <FaFilter className="mr-2 text-gray-400" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              value={filters.source}
              onChange={(e) => setFilters({...filters, source: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">All Sources</option>
              <option value="website">Website</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search contacts..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredContacts}
            onEdit={openEditModal}
            onDelete={(contact) => handleDelete(contact.id)}
            onView={(contact) => console.log('View:', contact)}
            selectable={true}
            onSelect={(selectedIds) => console.log('Selected:', selectedIds)}
            pagination={true}
            pageSize={10}
          />
        )}
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        size="large"
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter message"
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
              {saving ? 'Saving...' : (editingContact ? 'Update Contact' : 'Add Contact')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Contacts;