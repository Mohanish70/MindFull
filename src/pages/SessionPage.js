// src/pages/SessionPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const SessionPage = () => {
  const { sessionType } = useParams();  // This will get the session type from the URL

  let sessionAudio = '';

  // Switch case to select the appropriate audio based on sessionType
  switch (sessionType) {
    case 'Mindfulness Meditation':
      sessionAudio = '/path/to/mindfulness-audio.mp3';
      break;
    case 'Stress Relief':
      sessionAudio = '/path/to/stress-relief-audio.mp3';
      break;
    // Add other session types here...
    default:
      sessionAudio = '/path/to/default-audio.mp3';
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold">{sessionType}</h2>
        <audio controls>
          <source src={sessionAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default SessionPage;
