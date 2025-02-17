import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MeditationChallenges from './components/MeditationChallenges';
import MoodSurvey from './components/MoodSurvey';
import Navbar from './components/Navbar';
import ProgressChart from './components/ProgressChart';
import ShareJourney from './components/ShareJourney';
import { useAuth } from './context/AuthContext';
import { MeditationProvider } from './context/MeditationContext'; // Import MeditationContext
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import SessionPage from './pages/SessionPage';

function App() {
  const { user } = useAuth(); // Use the user data from AuthContext

  return (
    <MeditationProvider> {/* Wrap the app with MeditationProvider to provide meditation context */}
      <Navbar /> {/* Render Navbar on all pages */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
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

        {/* New Routes */}
        <Route path="/mood-survey" element={<MoodSurvey />} />
        <Route path="/share-journey" element={<ShareJourney />} />
        <Route path="/progress" element={<ProgressChart progressData={{ labels: ['Feb 1', 'Feb 2'], data: [10, 15] }} />} />
        <Route path="/challenges" element={<MeditationChallenges />} />
      </Routes>

      <Footer /> {/* Render Footer on all pages */}
    </MeditationProvider>
  );
}

export default App;
