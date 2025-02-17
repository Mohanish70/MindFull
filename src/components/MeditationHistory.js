import React from 'react';

const MeditationHistory = ({ history }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold">Meditation History</h3>
      {history && history.length > 0 ? (
        <ul>
          {history.map((session, idx) => (
            <li key={idx} className="border-b py-2">
              <span>{session.date}: {session.title} - {session.duration} minutes</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No meditation history available yet.</p>
      )}
    </div>
  );
};

export default MeditationHistory;
