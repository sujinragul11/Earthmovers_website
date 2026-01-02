import React, { useState, useEffect } from 'react';
import DataTable from '../componants/ui/DataTable';
import { contactService } from '../services/contactService';
import { FaFilter, FaDownload, FaUserPlus, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

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

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await contactService.getContacts(filters);
      const statsResult = await contactService.getStats();
      
      if (result.success) {
        setContacts(result.data);
        setFilteredContacts(result.data);
      }
      
      if (statsResult.success) {
        setStats({
          total: statsResult.data.total,
          new: statsResult.data.newLeads,
          contacted: statsResult.data.contacted,
          converted: statsResult.data.converted
        });
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
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
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
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
            onEdit={(contact) => console.log('Edit:', contact)}
            onDelete={(contact) => handleDelete(contact.id)}
            onView={(contact) => console.log('View:', contact)}
            selectable={true}
            onSelect={(selectedIds) => console.log('Selected:', selectedIds)}
            pagination={true}
            pageSize={10}
          />
        )}
      </div>
    </div>
  );
};

export default Contacts;