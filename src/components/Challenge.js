import axios from 'axios';
import React, { useState } from 'react';

function Challenge({ challengeName }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const joinChallenge = async () => {
    setLoading(true);
    setMessage(''); // Reset the message before new request

    try {
      const response = await axios.post('/api/challenges/joinChallenge', { challengeName });
      setMessage(response.data); // Success message from server
    } catch (error) {
      setMessage('Failed to join the challenge.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold">{challengeName} Challenge</h2>
      <button
        onClick={joinChallenge}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition-colors"
        disabled={loading} // Disable button during loading
      >
        {loading ? 'Joining...' : 'Join Challenge'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default Challenge;
