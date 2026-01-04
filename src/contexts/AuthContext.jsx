import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../admin/services/authService';

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
    const result = await authService.login(email, password);
    
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('admin_user', JSON.stringify(result.user));
      localStorage.setItem('admin_token', result.token);
      return { success: true, user: result.user };
    }
    
    return { success: false, message: result.message };
  };

  const logout = async () => {
    await authService.logout();
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