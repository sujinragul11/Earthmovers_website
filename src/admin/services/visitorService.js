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

// Real API service for visitors
export const visitorService = {
  getStats: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/visitors/stats?${query}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch visitor stats');
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getRealTimeVisitors: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/realtime`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch real-time visitors');
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching real-time visitors:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  trackVisit: async (visitData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitData)
      });

      if (!response.ok) {
        throw new Error('Failed to track visit');
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Error tracking visit:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};