// src/components/ProgressChart.js
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

// Registering the required components from chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = ({ progressData }) => {
  const data = {
    labels: progressData.labels,
    datasets: [
      {
        label: 'Time Spent Meditating (minutes)',
        data: progressData.data,
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default ProgressChart;
