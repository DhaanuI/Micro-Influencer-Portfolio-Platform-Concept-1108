import React, { createContext, useContext, useState, useEffect } from 'react';
import { clearAuthData, getAuthToken } from '../utils/apiHelpers';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          // Validate token and get user data
          const response = await api.auth.getMe();
          if (response?.user) {
            setUser(response.user);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        // Clear invalid token
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    // Clear auth token and user data from localStorage
    clearAuthData();
    // Clear user state
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthModalOpen,
      authMode,
      openAuthModal,
      closeAuthModal,
      setAuthMode,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};