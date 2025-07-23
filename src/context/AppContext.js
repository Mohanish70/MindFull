import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [sessions, setSessions] = useState(() => {
    try {
      const storedSessions = localStorage.getItem('meditationSessions');
      return storedSessions ? JSON.parse(storedSessions) : [];
    } catch (error) {
      console.error("Error parsing sessions data:", error);
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem('meditationHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Error parsing history data:", error);
      return [];
    }
  });

  const navigate = useNavigate();

  // Persist user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Persist sessions data
  useEffect(() => {
    localStorage.setItem('meditationSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Persist history data
  useEffect(() => {
    localStorage.setItem('meditationHistory', JSON.stringify(history));
  }, [history]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      const userData = { 
        email, 
        name: data.name || email.split('@')[0],
        token: data.token 
      };
      setUser(userData);
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const addSession = (session) => {
    setSessions(prev => [...prev, session]);
  };

  const addHistory = (sessionRecord) => {
    setHistory(prev => [...prev, sessionRecord]);
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      sessions,
      history,
      addSession,
      addHistory,
      setSessions,
      setHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};