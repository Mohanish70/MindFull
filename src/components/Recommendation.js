import axios from 'axios';
import React, { useState } from 'react';

function Recommendation({ mood }) {
  const [recommendation, setRecommendation] = useState('');

  const fetchRecommendation = async () => {
    try {
      const response = await axios.post('/api/recommendations/getRecommendation', { mood });
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error('Error fetching recommendation', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold">Get Your Recommendation</h2>
      <button
        onClick={fetchRecommendation}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Get Recommendation
      </button>
      {recommendation && <p className="mt-4">{recommendation}</p>}
    </div>
  );
}

export default Recommendation;
