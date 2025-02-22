import axios from 'axios';
import React, { useState } from 'react';

function Recommendation({ mood }) {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendation = async () => {
    setLoading(true);
    setError(''); // Reset previous errors
    setRecommendation(''); // Reset recommendation

    console.log('Mood sent:', mood); // Log the mood value to check what is being sent

    try {
      // Make the API call to get the recommendation
      const response = await axios.post('http://localhost:5000/api/recommendations/getRecommendation', { mood });
      console.log('Recommendation received:', response.data.recommendation); // Log the response
      setRecommendation(response.data.recommendation); // Set the recommendation
    } catch (error) {
      setError('Failed to fetch recommendation.');
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold">Get Your Recommendation</h2>
      <button
        onClick={fetchRecommendation} // Trigger the fetchRecommendation function on button click
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors"
        disabled={loading} // Disable the button while loading
      >
        {loading ? 'Loading...' : 'Get Recommendation'}
      </button>
      {recommendation && <p className="mt-4">{recommendation}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Recommendation;
