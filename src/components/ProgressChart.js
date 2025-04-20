// src/components/ProgressChart.js
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,      // ✅ Needed for area fill
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ progressData }) => {
  const data = {
    labels: progressData.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Time Spent Meditating (minutes)',
        data: progressData.data || [5, 10, 7, 12, 9],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // ✅ For fill
        fill: true, // ✅ Enable fill
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Meditation Progress',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ProgressChart;
