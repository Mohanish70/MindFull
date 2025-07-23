import axios from 'axios';
import React, { useState } from 'react';
import { FaBed, FaMeh, FaSadTear, FaSmile } from 'react-icons/fa';

const MoodSurvey = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) {
      setError('Please select a mood!');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      // Update the URL below with your backend endpoint for recommendations
      const response = await axios.post('/api/recommendations/getRecommendation', { mood });
      setRecommendation(response.data.recommendation);
    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-survey-container">
      <h2>How Are You Feeling Today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mood-icons">
          <button
            type="button"
            onClick={() => setMood('happy')}
            className={mood === 'happy' ? 'selected' : ''}
          >
            <FaSmile size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('sad')}
            className={mood === 'sad' ? 'selected' : ''}
          >
            <FaSadTear size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('neutral')}
            className={mood === 'neutral' ? 'selected' : ''}
          >
            <FaMeh size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('tired')}
            className={mood === 'tired' ? 'selected' : ''}
          >
            <FaBed size={60} />
          </button>
        </div>

        <button type="submit" disabled={!mood || loading}>
          {loading ? 'Loading...' : 'Get Recommendation'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {recommendation && !error && (
        <div className="recommendation">
          <h3>Your Recommendation:</h3>
          <p>{recommendation}</p>
          <div>
            {mood === 'happy' && <img src="/images/happymood.webp" alt="Happy Mood" />}
            {mood === 'sad' && <img src="/images/sadmood.webp" alt="Sad Mood" />}
            {mood === 'neutral' && <img src="/images/calmmood.webp" alt="Neutral Mood" />}
            {mood === 'tired' && <img src="/images/anxiousmood.webp" alt="Tired Mood" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSurvey;
