// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Real API service for contacts
export const contactService = {
  getContacts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/contacts?${query}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.contacts || data,
        total: data.total || data.length,
        page: data.page || 1,
        pages: data.pages || 1
      };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getContact: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching contact:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  updateContactStatus: async (id, status, assignedTo = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, assignedTo })
      });

      if (!response.ok) {
        throw new Error('Failed to update contact status');
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error updating contact:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  deleteContact: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      return {
        success: true,
        message: 'Contact deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting contact:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/stats/overview`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact stats');
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};