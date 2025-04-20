import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext'; // Import DarkModeContext
import { MeditationProvider } from './context/MeditationContext'; // Import MeditationContext
import Meditation from './services/meditation';
// Components
import BenefitsSection from './components/BenefitsSection';
import DailyTip from './components/DailyTip';
import DarkModeToggle from './components/DarkModeToggle';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import Header from './components/Header';
import MeditationChallenges from './components/MeditationChallenges';
import MoodSurvey from './components/MoodSurvey';
import MoodTracker from './components/MoodTracker';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import ProgressChart from './components/ProgressChart';
import Recommendation from './components/Recommendation';
import Reminder from './components/Reminder';
import ShareJourney from './components/ShareJourney';
import TestimonialsSection from './components/TestimonialsSection';

// Pages
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import SessionPage from './pages/SessionPage';

function App() {
  const { user } = useAuth(); // Use the user data from AuthContext
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Notification Handler
  const showNotification = (message) => {
    setNotificationMessage(message);
  };

  return (
    <DarkModeProvider> {/* Wrap the app with DarkModeProvider */}
      <MeditationProvider> {/* Wrap the app with MeditationProvider */}
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* Navbar & Header */}
        <Navbar />
        <Header user={user} /> {/* Ensure user is passed to Header */}

        {/* Display Notifications */}
        <Notification message={notificationMessage} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home showNotification={showNotification} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />} // Redirect logged-in users to dashboard
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />} // Redirect logged-in users to dashboard
          />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />} // Redirect non-logged-in users to login
          />
          <Route
            path="/admin-panel"
            element={user && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} // Admin-only route
          />
          <Route path="/session/:sessionType" element={<SessionPage />} />

          {/* Additional Routes */}
          <Route path="/mood-survey" element={<MoodSurvey />} />
          <Route path="/share-journey" element={<ShareJourney />} />
          <Route path="/progress" element={<ProgressChart progressData={{ labels: ['Feb 1', 'Feb 2'], data: [10, 15] }} />} />
          <Route path="/challenges" element={<MeditationChallenges />} />

          {/* Optional Section Routes */}
          <Route path="/testimonials" element={<TestimonialsSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/benefits" element={<BenefitsSection />} />
          <Route path="/daily-tip" element={<DailyTip />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/meditation" element={<Meditation />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </MeditationProvider>
    </DarkModeProvider>
  );
}

export default App;
