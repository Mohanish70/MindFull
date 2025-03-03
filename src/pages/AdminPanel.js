// src/pages/AdminPanel.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const AdminPanel = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Meditation Sessions',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Manage users and content here.</p>
      <Line data={data} />
    </div>
  );
};

export default AdminPanel;
