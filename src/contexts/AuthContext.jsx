import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const mockUsers = [
      { id: 1, email: 'admin@earthmovers.com', name: 'Super Admin', role: 'superadmin' },
      { id: 2, email: 'manager@earthmovers.com', name: 'Manager', role: 'manager' },
    ];

    const user = mockUsers.find(u => u.email === email && password === 'admin123');
    
    if (user) {
      setUser(user);
      localStorage.setItem('admin_user', JSON.stringify(user));
      localStorage.setItem('admin_token', 'mock-jwt-token');
      return { success: true, user };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('admin_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};