import axios from 'axios';
import React, { useState } from 'react';
import { FaBed, FaMeh, FaSadTear, FaSmile } from 'react-icons/fa'; // Emojis as icons
import './MoodSurvey.css'; // Assuming you have some custom CSS

const MoodSurvey = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle submitting the mood and fetching recommendations
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!mood) {
      setError('Please select a mood!');
      return; // Don't proceed if no mood is selected
    }

    setLoading(true); // Show loading spinner
    setError(''); // Reset any previous errors
    setRecommendation(''); // Reset previous recommendation

    try {
      const response = await axios.post('/api/recommendations/getRecommendation', { mood });
      setRecommendation(response.data.recommendation); // Display recommendation
    } catch (err) {
      console.error('Error fetching recommendation', err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner after fetch
    }
  };

  return (
    <div className="mood-survey-container text-center py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">How Are You Feeling Today?</h2>
      <form id="moodSurvey" onSubmit={handleSubmit} className="my-4">
        <label htmlFor="mood" className="block text-lg mb-2">Select Your Mood</label>
        <div className="mood-icons flex justify-center space-x-6 mt-4">
          {/* Mood buttons */}
          <button
            type="button"
            onClick={() => setMood('happy')}
            className={`p-2 hover:scale-110 transition-all rounded-full ${mood === 'happy' ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <FaSmile size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('sad')}
            className={`p-2 hover:scale-110 transition-all rounded-full ${mood === 'sad' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <FaSadTear size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('neutral')}
            className={`p-2 hover:scale-110 transition-all rounded-full ${mood === 'neutral' ? 'text-green-500' : 'text-gray-500'}`}
          >
            <FaMeh size={60} />
          </button>
          <button
            type="button"
            onClick={() => setMood('tired')}
            className={`p-2 hover:scale-110 transition-all rounded-full ${mood === 'tired' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <FaBed size={60} />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!mood || loading} // Disable button if no mood selected or if loading
          className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Get Recommendation'}
        </button>
      </form>

      {/* Error message */}
      {error && <div className="error-message mt-8 p-4 border border-red-300 rounded-lg text-red-500">{error}</div>}

      {/* Recommendation Section */}
      {recommendation && !error && (
        <div className="recommendation mt-8 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Your Recommendation:</h3>
          <p className="mt-2">{recommendation}</p>
          <div className="mt-4">
            {/* Conditional images based on mood */}
            {mood === 'happy' && <img src="/images/happymood.webp" alt="Happy Mood" className="mood-image" />}
            {mood === 'sad' && <img src="/images/sadmood.webp" alt="Sad Mood" className="mood-image" />}
            {mood === 'neutral' && <img src="/images/calmmood.webp" alt="Neutral Mood" className="mood-image" />}
            {mood === 'tired' && <img src="/images/anxiousmood.webp" alt="Tired Mood" className="mood-image" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSurvey;
