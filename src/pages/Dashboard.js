import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './dashboard.css';

// Components
import Header from '../components/Header';
import DailyTip from '../components/DailyTip';
import MoodTracker from '../components/MoodTracker';
import MeditationCard from '../components/MeditationCard';
import MeditationProgress from '../components/MeditationProgress';
import MeditationHistory from '../components/MeditationHistory';
import Reminder from '../components/Reminder';

// Session Images
import mindfulnessImg from '../images/mindfulness.webp';
import bodyScanImg from '../images/body-scan.webp';
import stressReliefImg from '../images/stress-relief.webp';
import focusImg from '../images/focus.webp';
import sleepImg from '../images/sleep.webp';

// Icons
import meditationIcon from '../images/meditation-icon.webp';
import therapyIcon from '../images/therapy-icon.webp';
import communityIcon from '../images/community-icon.webp';
import logoutIcon from '../images/logout-icon.webp';

function Dashboard() {
  const { user, logout, sessions, history, addHistory } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('meditation');
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startSession = (session) => {
    setCurrentSession(session);
    setSessionTime(0);
    
    // Clear any existing timer
    if (timer) clearInterval(timer);
    
    // Start new timer
    const newTimer = setInterval(() => {
      setSessionTime(prevTime => {
        const newTime = prevTime + 1;
        
        // If session completed
        if (newTime >= session.duration * 60) {
          clearInterval(newTimer);
          completeSession(session);
          return prevTime;
        }
        
        return newTime;
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  const completeSession = (session) => {
    const sessionRecord = {
      id: Date.now(),
      sessionId: session.id,
      title: session.title,
      date: new Date().toISOString(),
      duration: session.duration,
      completed: true
    };
    
    addHistory(sessionRecord);
    setCurrentSession(null);
  };

  const stopSession = () => {
    if (timer) clearInterval(timer);
    setCurrentSession(null);
    setSessionTime(0);
  };

  const setReminder = (time) => {
    console.log(`Reminder set for ${time}`);
    // In a real app, you would implement reminder logic here
  };

  const moodData = [
    { date: 'Mon', moodScore: 7 },
    { date: 'Tue', moodScore: 5 },
    { date: 'Wed', moodScore: 6 },
    { date: 'Thu', moodScore: 8 },
    { date: 'Fri', moodScore: 9 },
    { date: 'Sat', moodScore: 7 },
    { date: 'Sun', moodScore: 6 }
  ];

  const meditationSessions = [
    { 
      id: 1,
      title: 'Mindfulness Meditation', 
      description: '10-minute guided session for beginners', 
      duration: 10,
      image: mindfulnessImg 
    },
    { 
      id: 2,
      title: 'Body Scan', 
      description: '15-minute full body relaxation', 
      duration: 15,
      image: bodyScanImg 
    },
    { 
      id: 3,
      title: 'Stress Relief', 
      description: '5-minute breathing exercise', 
      duration: 5,
      image: stressReliefImg 
    },
    { 
      id: 4,
      title: 'Focus Meditation', 
      description: '15-minute focus enhancement', 
      duration: 15,
      image: focusImg 
    },
    { 
      id: 5,
      title: 'Sleep Meditation', 
      description: '20-minute sleep preparation', 
      duration: 20,
      image: sleepImg 
    }
  ];

  const challenges = [
    { id: 1, title: '7-Day Mindfulness Challenge', progress: 3, total: 7 },
    { id: 2, title: '30-Day Meditation Streak', progress: 12, total: 30 }
  ];

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="dashboard-container">
      <Header>
        <button onClick={handleLogout} className="logout-btn">
          <img src={logoutIcon} alt="Logout" className="logout-icon" />
          Logout
        </button>
      </Header>
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <section className="welcome-section">
            <h2>Welcome back, {user?.name || user?.email || 'User'}!</h2>
            <p>How are you feeling today?</p>
          </section>

          <DailyTip />
          <MoodTracker data={moodData} />

          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'meditation' ? 'active' : ''}`}
              onClick={() => setActiveTab('meditation')}
            >
              <img src={meditationIcon} alt="Meditation" className="tab-icon" />
              Meditation
            </button>
            <button 
              className={`tab-btn ${activeTab === 'therapy' ? 'active' : ''}`}
              onClick={() => setActiveTab('therapy')}
            >
              <img src={therapyIcon} alt="Therapy" className="tab-icon" />
              Therapy
            </button>
            <button 
              className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <img src={communityIcon} alt="Community" className="tab-icon" />
              Community
            </button>
          </div>

          {activeTab === 'meditation' && (
            <>
              {currentSession && (
                <MeditationProgress 
                  session={currentSession} 
                  time={sessionTime}
                  onStop={stopSession}
                />
              )}

              <div className="sessions-grid">
                {meditationSessions.map(session => (
                  <MeditationCard
                    key={session.id}
                    session={session}
                    onStart={() => startSession(session)}
                  />
                ))}
              </div>

              <div className="challenges-section">
                <h3>Current Challenges</h3>
                <div className="challenges-grid">
                  {challenges.map(challenge => (
                    <div key={challenge.id} className="challenge-card">
                      <h4>{challenge.title}</h4>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(challenge.progress/challenge.total)*100}%` }} 
                        />
                      </div>
                      <p>{challenge.progress}/{challenge.total} days</p>
                    </div>
                  ))}
                </div>
              </div>

              <Reminder setReminder={setReminder} />
              <MeditationHistory history={history} />
            </>
          )}

          {activeTab === 'therapy' && (
            <div className="therapy-section">
              <h3>Therapy Resources</h3>
              <p>Connect with licensed therapists</p>
              <button className="primary-btn">Find a Therapist</button>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="community-section">
              <h3>Community Support</h3>
              <p>Join discussions with others</p>
              <button className="primary-btn">Browse Groups</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;