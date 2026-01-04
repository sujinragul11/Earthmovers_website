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

export const analyticsService = {
  getVisitorStats: async (period = 'week') => {
    // Map frontend period values to backend expected values
    const periodMapping = {
      '24h': 'today',
      '7d': 'week',
      '30d': 'month',
      '90d': 'year'
    };
    
    const backendPeriod = periodMapping[period] || period;
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/stats?period=${backendPeriod}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch visitor stats');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data // Extract the inner data object
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
        data: data.data // Extract the inner data object
      };
    } catch (error) {
      console.error('Error fetching real-time visitors:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getPageViews: async (period = '7d') => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/pageviews?period=${period}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch page views');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data // Extract the inner data object
      };
    } catch (error) {
      console.error('Error fetching page views:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  getConversionMetrics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/conversion`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversion metrics');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.data // Extract the inner data object
      };
    } catch (error) {
      console.error('Error fetching conversion metrics:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};