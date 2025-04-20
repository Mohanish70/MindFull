import React, { useState } from 'react';
import { useMeditation } from '../context/MeditationContext';

const Meditation = () => {
  // Extract context values and functions
  const { currentSession, sessionTime, reminderTime, history, startSession, stopSession, setReminder } = useMeditation();

  // Local state for session title and reminder input
  const [sessionTitle, setSessionTitle] = useState('');
  const [reminder, setReminderInput] = useState('');

  // Format the session time into minutes:seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Start a new session with the provided title
  const handleStartSession = () => {
    const newSession = { title: sessionTitle || 'New Meditation Session' };
    startSession(newSession);
  };

  // Set a reminder with the provided time
  const handleSetReminder = () => {
    if (reminder) {
      setReminder(reminder);
    } else {
      alert('Please set a reminder time');
    }
  };

  // Stop the current session
  const handleStopSession = () => {
    stopSession();
  };

  return (
    <div className="meditation-container">
      <h1 className="text-3xl mb-4">Meditation Session</h1>

      {/* Session controls */}
      {!currentSession ? (
        <div>
          <input
            type="text"
            placeholder="Session Title"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            className="session-input mb-2"
          />
          <button
            onClick={handleStartSession}
            className="start-session-button bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Start Meditation Session
          </button>
        </div>
      ) : (
        <div>
          <h2>Current Session: {currentSession.title}</h2>
          <p>Time: {formatTime(sessionTime)}</p>
          {reminderTime && <p>Reminder set for: {reminderTime}</p>}

          <button
            onClick={handleStopSession}
            className="end-session-button bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            End Session
          </button>
        </div>
      )}

      {/* Reminder Section */}
      <div className="reminder-section mt-6">
        <input
          type="time"
          value={reminder}
          onChange={(e) => setReminderInput(e.target.value)}
          className="reminder-input mb-2"
        />
        <button
          onClick={handleSetReminder}
          className="set-reminder-button bg-yellow-500 text-white py-2 px-4 rounded-lg"
        >
          Set Reminder
        </button>
      </div>

      {/* Session History */}
      <div className="history-section mt-8">
        <h3 className="text-2xl">Session History</h3>
        {history.length > 0 ? (
          <ul>
            {history.map((session, index) => (
              <li key={index}>
                {session.date} - {session.title} ({session.duration} minutes)
              </li>
            ))}
          </ul>
        ) : (
          <p>No sessions recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Meditation;
