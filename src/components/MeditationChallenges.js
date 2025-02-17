import axios from 'axios';
import React, { useState } from 'react';

const MeditationChallenges = () => {
  const [loading, setLoading] = useState(false);

  const joinChallenge = async (challengeName) => {
    try {
      setLoading(true);
      await axios.post('/api/recommendations/joinChallenge', { challengeName });
      alert('You have successfully joined the challenge!');
    } catch (error) {
      console.error('Error joining challenge', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="meditationChallenges">
      <h3>Join a Meditation Challenge</h3>
      <button onClick={() => joinChallenge('Mindfulness Challenge')} disabled={loading}>
        {loading ? 'Joining...' : 'Join Mindfulness Challenge'}
      </button>
      <button onClick={() => joinChallenge('Sleep Meditation Challenge')} disabled={loading}>
        {loading ? 'Joining...' : 'Join Sleep Meditation Challenge'}
      </button>
    </div>
  );
};

export default MeditationChallenges;
