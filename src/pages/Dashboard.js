import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BenefitsSection from '../components/BenefitsSection';
import DailyTip from '../components/DailyTip';
import FeaturesSection from '../components/FeaturesSection';
import Header from '../components/Header';
import MeditationCard from '../components/MeditationCard';
import MeditationChallenges from '../components/MeditationChallenges';
import MeditationHistory from '../components/MeditationHistory';
import MeditationProgress from '../components/MeditationProgress';
import MoodSurvey from '../components/MoodSurvey';
import MoodTracker from '../components/MoodTracker';
import Recommendation from '../components/Recommendation';
import Reminder from '../components/Reminder';
import TestimonialsSection from '../components/TestimonialsSection';
import { useAuth } from '../context/AuthContext';
import { useMeditation } from '../context/MeditationContext';
import bodyscan from '../images/bodyscan.webp';
import focus from '../images/focus.webp';
import MeditationforKids from '../images/MeditationforKids.webp';
import mindfull_meditation from '../images/mindfull_meditation.webp';
import sleepmeditaion from '../images/sleepmeditation.webp';
import stressrelief from '../images/stressrelief.webp';
import './dashboard.css';


// Correct image import
import backgroundImage from '../images/background.webp'; // Adjust the path if necessary

function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { currentSession, sessionTime, history, startSession, setReminder } = useMeditation();

  const [mood, setMood] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const moodData = [
    { date: '2025-02-13', moodScore: 7 },
    { date: '2025-02-14', moodScore: 5 },
    { date: '2025-02-15', moodScore: 6 },
    { date: '2025-02-16', moodScore: 8 },
  ];

  const meditationSessions = [
    { title: 'Mindfulness Meditation', description: '10-minute guided session.', image: mindfull_meditation },  
    { title: 'Body Scan', description: '15-minute guided session.', image: bodyscan },
    { title: 'Stress Relief', description: '5-minute breathing exercise.', image: stressrelief },
    { title: 'Focus & Productivity', description: '15-minute guided session.', image: focus },
    { title: 'Sleep Meditation', description: '20-minute guided session.', image: sleepmeditaion },
    { title: 'Meditation for Kids', description: '5-minute guided session.', image: MeditationforKids }
  ];
  
  

  return (
    <div 
      className="dashboard-container bg-gray-100 min-h-screen p-8"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="dashboard-content max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg opacity-90">
        {/* Header Section */}
        <Header user={user} />

        {/* Daily Mental Health Tip */}
        <div className="mb-8">
          <DailyTip />
        </div>

        {/* Mood Survey */}
        <div className="mb-8">
          <MoodSurvey />
        </div>

        {/* Mood Tracker */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Mood Over Time</h2>
          <MoodTracker moodData={moodData} />
        </div>

        {/* Personalized Meditation Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold">How Are You Feeling Today?</h2>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border p-2 rounded-lg mt-2"
          >
            <option value="anxious">Anxious</option>
            <option value="stressed">Stressed</option>
            <option value="happy">Happy</option>
            <option value="tired">Tired</option>
            <option value="angry">Angry</option>
          </select>
        </div>
        <Recommendation mood={mood} />

        {/* Meditation Benefits Section */}
        <div className="mb-8">
          <BenefitsSection />
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <FeaturesSection />
        </div>

        {/* Testimonials Section */}
        <div className="mb-8">
          <TestimonialsSection />
        </div>

        {/* Meditation Challenges */}
        <div className="mb-8">
          <MeditationChallenges />
        </div>

        {/* Meditation Cards (Sessions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {meditationSessions.map((session, idx) => (
            <MeditationCard
              key={idx}
              title={session.title}
              description={session.description}
              image={session.image}
              onStart={() => startSession(session)}
            />
          ))}
        </div>

        {/* Meditation Progress */}
        <div className="mb-8">
          {currentSession && (
            <MeditationProgress sessionType={currentSession.title} sessionTime={sessionTime} />
          )}
        </div>

        {/* Meditation Reminder */}
        <div className="mb-8">
          <Reminder setReminder={setReminder} />
        </div>

        {/* Meditation History */}
        <div className="mb-8">
          <MeditationHistory history={history} />
        </div>

        {/* Logout Button */}
        <div className="logout-button-container mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
