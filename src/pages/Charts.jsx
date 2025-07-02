// src/pages/Charts.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Charts = () => {
  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">2D Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default Charts;
