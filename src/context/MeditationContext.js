import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the Meditation Context
const MeditationContext = createContext();

// Custom hook to use the Meditation Context
export const useMeditation = () => useContext(MeditationContext);

// MeditationProvider component that wraps your app and provides context
export const MeditationProvider = ({ children }) => {
  // States for current session, session time, reminder time, and meditation history
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionTime, setSessionTime] = useState(0); // Session progress time in seconds
  const [reminderTime, setReminderTime] = useState(''); // Reminder time as string
  const [history, setHistory] = useState([
    { date: '2025-02-13', title: 'Mindfulness Meditation', duration: 10 }, // Example history item
    { date: '2025-02-12', title: 'Stress Relief', duration: 5 },            // Example history item
  ]);

  // Function to start a new session and track the time
  const startSession = (session) => {
    setCurrentSession(session);
    setSessionTime(0); // Reset session time when starting a new session
  };

  // Update session progress every second
  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        setSessionTime((prevTime) => prevTime + 1);
      }, 1000);

      // Clear interval when the session ends or is reset
      return () => clearInterval(timer);
    }
  }, [currentSession]);

  // Function to set a reminder
  const setReminder = (time) => {
    setReminderTime(time);
    alert(`Reminder set for ${time}`); // Show alert when a reminder is set
  };

  // Function to add a new meditation session to the history
  const addSessionToHistory = (session) => {
    const newSession = {
      date: new Date().toLocaleDateString(), // Current date in the format MM/DD/YYYY
      title: session.title,
      duration: session.duration,
    };

    // Update the history state with the new session
    setHistory((prevHistory) => [newSession, ...prevHistory]);
  };

  // Function to stop the current session and add it to history
  const stopSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        duration: sessionTime, // Set the session duration to the elapsed time
      };
      addSessionToHistory(updatedSession);
      setCurrentSession(null); // Reset the current session
      setSessionTime(0); // Reset the session time
    }
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
        stopSession,
      }}
    >
      {children} {/* Render children components that will have access to this context */}
    </MeditationContext.Provider>
  );
};
