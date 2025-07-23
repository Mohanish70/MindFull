import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './MoodTracker.css';

const MoodTracker = ({ data = [] }) => {
  // Ensure data is always an array, even if undefined
  const moodData = Array.isArray(data) ? data : [];

  // Default data if empty
  const defaultData = [
    { date: 'Mon', moodScore: 5 },
    { date: 'Tue', moodScore: 6 },
    { date: 'Wed', moodScore: 7 },
    { date: 'Thu', moodScore: 6 },
    { date: 'Fri', moodScore: 8 },
    { date: 'Sat', moodScore: 7 },
    { date: 'Sun', moodScore: 9 }
  ];

  const chartData = moodData.length > 0 ? moodData : defaultData;

  return (
    <div className="mood-tracker-container">
      <h3>Your Mood This Week</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="moodScore" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTracker;