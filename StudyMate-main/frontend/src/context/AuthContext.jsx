import React, { createContext, useState, useEffect } from 'react';
import { login, register, getMe } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('studymate_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('studymate_token') || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await getMe();
          if (res.success) {
            setUser(res.data);
            localStorage.setItem('studymate_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.error('Session validation error:', err);
          logoutUser();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const loginUser = async (credentials) => {
    const res = await login(credentials);
    if (res.success) {
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem('studymate_token', res.data.token);
      localStorage.setItem('studymate_user', JSON.stringify(res.data));
    }
    return res;
  };

  const registerUser = async (userData) => {
    const res = await register(userData);
    if (res.success) {
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem('studymate_token', res.data.token);
      localStorage.setItem('studymate_user', JSON.stringify(res.data));
    }
    return res;
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('studymate_token');
    localStorage.removeItem('studymate_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        loginUser,
        registerUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
