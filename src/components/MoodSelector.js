import { useState } from 'react';
import './MoodSelector.css';

const moods = [
  { value: 'happy', label: '😊 Happy', color: '#F6E05E' },
  { value: 'calm', label: '😌 Calm', color: '#68D391' },
  { value: 'stressed', label: '😫 Stressed', color: '#F687B3' },
  { value: 'anxious', label: '😰 Anxious', color: '#B794F4' },
  { value: 'tired', label: '😴 Tired', color: '#4FD1C5' },
  { value: 'sad', label: '😔 Sad', color: '#4299E1' },
];

const MoodSelector = ({ onSubmit, isLoading }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      onSubmit(selectedMood);
    }
  };

  return (
    <form className="mood-selector" onSubmit={handleSubmit}>
      <h3 className="mood-selector-title">How are you feeling today?</h3>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
            style={{ backgroundColor: mood.color }}
            onClick={() => handleMoodSelect(mood.value)}
          >
            {mood.label}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="submit-button"
        disabled={!selectedMood || isLoading}
      >
        {isLoading ? 'Getting Recommendation...' : 'Get Recommendation'}
      </button>
    </form>
  );
};

export default MoodSelector;