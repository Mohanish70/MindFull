import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

// Pages
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import SessionPage from './pages/SessionPage';

// Sections
import BenefitsSection from './components/BenefitsSection';
import DailyTip from './components/DailyTip';
import FeaturesSection from './components/FeaturesSection';
import MeditationChallenges from './components/MeditationChallenges';
import MoodSurvey from './components/MoodSurvey';
import MoodTracker from './components/MoodTracker';
import ProgressChart from './components/ProgressChart';
import Recommendation from './components/Recommendation';
import Reminder from './components/Reminder';
import ShareJourney from './components/ShareJourney';
import TestimonialsSection from './components/TestimonialsSection';
import Meditation from './services/meditation';

function App() {
  const { user } = useAuth();
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = (message) => {
    setNotificationMessage(message);
  };

  return (
    <div className="app-container">
      <Navbar />
      <Header user={user} />
      <Notification message={notificationMessage} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home showNotification={showNotification} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-panel"
          element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />}
        />
        <Route path="/session/:sessionType" element={<SessionPage />} />

        {/* Features */}
        <Route path="/mood-survey" element={<MoodSurvey />} />
        <Route path="/share-journey" element={<ShareJourney />} />
        <Route path="/progress" element={
          <ProgressChart
            progressData={{
              labels: ['Week 1', 'Week 2', 'Week 3'],
              data: [10, 15, 20],
            }}
          />
        } />
        <Route path="/challenges" element={<MeditationChallenges />} />
        <Route path="/testimonials" element={<TestimonialsSection />} />
        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/benefits" element={<BenefitsSection />} />
        <Route path="/daily-tip" element={<DailyTip />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/meditation" element={<Meditation />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;