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

// Real API service for equipment
export const equipmentService = {
  getEquipments: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/equipment?${query}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
        total: data.count || data.length,
        page: data.page || 1,
        pages: data.pages || 1
      };
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getEquipment: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  createEquipment: async (equipmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(equipmentData)
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        throw new Error('Authentication expired. Please login again.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create equipment');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('Error creating equipment:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  updateEquipment: async (id, equipmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(equipmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update equipment');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('Error updating equipment:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  deleteEquipment: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete equipment');
      }

      return {
        success: true,
        message: 'Equipment deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting equipment:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/stats/overview`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch equipment stats');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('Error fetching equipment stats:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};