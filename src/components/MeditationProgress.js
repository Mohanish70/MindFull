import React, { useEffect, useState } from 'react';

const MeditationProgress = ({ sessionType }) => {
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const sessionDuration = 600; // Example: Set 10 minutes as the session duration

  useEffect(() => {
    setSessionStartTime(Date.now());
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionType]); // Trigger re-run when sessionType changes

  const progress = (sessionTime / sessionDuration) * 100;

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Session Progress</h3>
      <div className="relative pt-2">
        <div className="absolute top-0 left-0 w-full bg-gray-300 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2 text-gray-700">
        <p>Time Spent: {sessionTime} seconds</p>
        <p>Session started at: {new Date(sessionStartTime).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default MeditationProgress;
// The MeditationProgress component displays the progress of the current meditation session. It calculates the progress based on the session time and duration, and updates the progress bar accordingly. The component also shows the time spent and the start time of the session.



