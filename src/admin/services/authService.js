// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }

    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    return { success: true };
  },

  checkAuth: () => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    return {
      isAuthenticated: !!token,
      user: user ? JSON.parse(user) : null
    };
  },

  getMe: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        return { success: false, message: 'No token' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      const data = await response.json();
      return {
        success: true,
        user: data
      };
    } catch (error) {
      console.error('Get me error:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};