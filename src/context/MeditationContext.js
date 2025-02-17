import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the Meditation Context
const MeditationContext = createContext();

// Custom hook to use the Meditation Context
export const useMeditation = () => useContext(MeditationContext);

// MeditationProvider component that wraps your app and provides context
export const MeditationProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionTime, setSessionTime] = useState(0); // Session progress time in seconds
  const [reminderTime, setReminderTime] = useState('');
  const [history, setHistory] = useState([
    { date: '2025-02-13', title: 'Mindfulness Meditation', duration: 10 },
    { date: '2025-02-12', title: 'Stress Relief', duration: 5 }
  ]);

  // Function to start a new session and track the time
  const startSession = (session) => {
    setCurrentSession(session);
    setSessionTime(0); // reset session time when starting a new session
  };

  // Update session progress every second
  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        setSessionTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentSession]);

  // Function to set a reminder
  const setReminder = (time) => {
    setReminderTime(time);
    alert(`Reminder set for ${time}`);
  };

  return (
    <MeditationContext.Provider
      value={{
        currentSession,
        sessionTime,
        reminderTime,
        history,
        startSession,
        setReminder,
      }}
    >
      {children}
    </MeditationContext.Provider>
  );
};
