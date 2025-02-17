/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { useState } from 'react';
import { FaBed, FaMeh, FaSadTear, FaSmile } from 'react-icons/fa'; // Emojis as icons
import './MoodSurvey.css';


const MoodSurvey = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle submitting the mood and fetching recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      const response = await axios.post('/api/recommendations/getRecommendation', { mood });
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error('Error fetching recommendation', error);
      setRecommendation("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  <button
  type="button"
  onClick={() => setMood('happy')}
  className={`p-2 hover:scale-110 transition-all rounded-full ${mood === 'happy' ? 'active' : ''}`}
>
  <FaSmile size={60} />
</button>


  return (
    <div className="mood-survey-container text-center py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">How Are You Feeling Today?</h2>
      <form id="moodSurvey" onSubmit={handleSubmit} className="my-4">
        <label htmlFor="mood" className="block text-lg mb-2">Select Your Mood</label>
        <div className="mood-icons flex justify-center space-x-6 mt-4">
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

        <button
          type="submit"
          disabled={!mood}
          className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Get Recommendation'}
        </button>
      </form>

      {recommendation && (
        <div className="recommendation mt-8 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Your Recommendation:</h3>
          <p className="mt-2">{recommendation}</p>
          <div className="mt-4">
            {mood === 'happy' && <img src="happy_image.jpg" alt="Happy Image" />}
            {mood === 'sad' && <img src="sad_image.jpg" alt="Sad Image" />}
            {mood === 'neutral' && <img src="neutral_image.jpg" alt="Neutral Image" />}
            {mood === 'tired' && <img src="tired_image.jpg" alt="Tired Image" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSurvey;
