export const authService = {
  login: async (email, password) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@earthmovers.com' && password === 'admin123') {
          resolve({
            success: true,
            user: {
              id: 1,
              email: 'admin@earthmovers.com',
              name: 'Super Admin',
              role: 'superadmin',
              avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=1E40AF&color=fff'
            },
            token: 'mock-jwt-token-123456'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  },

  logout: async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    return Promise.resolve({ success: true });
  },

  checkAuth: () => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    return {
      isAuthenticated: !!token,
      user: user ? JSON.parse(user) : null
    };
  }
};