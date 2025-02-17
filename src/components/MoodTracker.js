import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MoodTracker({ moodData }) {
  // Prepare the chart data based on the mood data provided
  const data = {
    labels: moodData.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Tracker',
        data: moodData.map(entry => entry.moodScore), // Mood score (0 - 10, for example)
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Options to make the chart responsive
  const options = {
    responsive: true,
    maintainAspectRatio: false, // To avoid squishing on small screens
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold">Mood Tracker</h2>
      <div style={{ height: '300px' }}> {/* Set a specific height */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MoodTracker;
