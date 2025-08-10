import { useEffect, useState } from 'react';
import { recommendationAPI } from '../services/api';
import ChallengeList from './ChallengeList';
import MoodSelector from './MoodSelector';
import './Recommendation.css';

const Recommendation = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch active challenges on component mount
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await recommendationAPI.getActiveChallenges();
        setChallenges(data.challenges);
      } catch (err) {
        setError('Failed to load challenges');
      }
    };
    
    fetchChallenges();
  }, []);

  const handleMoodSubmit = async (selectedMood) => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    setError('');
    setMood(selectedMood);

    try {
      const result = await recommendationAPI.getMoodRecommendation(selectedMood);
      setRecommendation(result);
    } catch (err) {
      setError(err || 'Failed to get recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      setIsLoading(true);
      const result = await recommendationAPI.joinChallenge(challengeId);
      setChallenges(prev => prev.map(c => 
        c.id === challengeId ? { ...c, joined: true } : c
      ));
      // Show success message or update UI
    } catch (err) {
      setError(err || 'Failed to join challenge');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-card">
        <h3 className="section-title">Personalized Recommendations</h3>
        
        <MoodSelector 
          currentMood={mood}
          onSubmit={handleMoodSubmit}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        {recommendation && (
          <div className="recommendation-result">
            <h4>For your {mood} mood, we recommend:</h4>
            <div className="recommendation-details">
              <h5>{recommendation.title}</h5>
              <p>{recommendation.description}</p>
              <p className="duration">Duration: {recommendation.duration} minutes</p>
              <button 
                className="start-button"
                onClick={() => {/* Start session logic */}}
              >
                Start Session
              </button>
            </div>
          </div>
        )}

        <div className="challenges-section">
          <h4>Current Challenges</h4>
          <ChallengeList 
            challenges={challenges}
            onJoin={handleJoinChallenge}
          />
        </div>
      </div>
    </div>
  );
};

export default Recommendation;