import React, { createContext, useContext, useEffect, useState } from 'react';

const MeditationContext = createContext();

export const useMeditation = () => useContext(MeditationContext);

export const MeditationProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [reminderTime, setReminderTime] = useState('');
  const [history, setHistory] = useState([]);

  const startSession = (session) => {
    setCurrentSession(session);
    setSessionTime(0);
  };

  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentSession]);

  const setReminder = (time) => {
    setReminderTime(time);
    alert(`Reminder set for ${time}`);
  };

  const addSessionToHistory = (session) => {
    const newSession = {
      date: new Date().toLocaleDateString(),
      title: session.title,
      duration: Math.floor(session.duration / 60) || 1, // duration in minutes, minimum 1
    };
    setHistory(prev => [newSession, ...prev]);
  };

  const stopSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        duration: sessionTime,
      };
      addSessionToHistory(updatedSession);
      setCurrentSession(null);
      setSessionTime(0);
    }
  };

  return (
    <MeditationContext.Provider
      value={{ currentSession, sessionTime, reminderTime, history, startSession, setReminder, stopSession }}
    >
      {children}
    </MeditationContext.Provider>
  );
};
