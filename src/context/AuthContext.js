import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });
  const navigate = useNavigate();

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // If login is successful, store the user data and token
      setUser({ email, token: data.token }); // Store user email and token
      localStorage.setItem('authToken', data.token); // Save token in localStorage
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      alert(error.message); // Show alert for errors
    }
  };

  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem('user'); // Remove user data from localStorage
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
