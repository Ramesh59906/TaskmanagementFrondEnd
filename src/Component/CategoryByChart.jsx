import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Axios from '../Axios/Axios'


ChartJS.register(ArcElement, Title, Tooltip, Legend);

const CategoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Total Users', 'Total Projects', 'Total Tasks', 'Total Tags', 'Total Activity Logs', 'Testers', 'Developers', 'Designers'], // Your categories
    datasets: [
      {
        label: 'Count',
        data: [0, 0, 0, 0, 0, 0, 0, 0], // Initial empty data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(71, 195, 195, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the API
    Axios
      .get('counts/')
      .then((response) => {
        const {
          total_users,
          total_projects,
          total_tasks,
          total_tags,
          total_activity_logs,
          total_testers,
          total_developers,
          total_designers,
        } = response.data;

        // Update the chart data with API response
        setChartData({
          labels: ['Total Users', 'Total Projects', 'Total Tasks', 'Total Tags', 'Total Activity Logs', 'Testers', 'Developers', 'Designers'], // Your categories
          datasets: [
            {
              label: 'Count',
              data: [
                total_users,
                total_projects,
                total_tasks,
                total_tags,
                total_activity_logs,
                total_testers,
                total_developers,
                total_designers,
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)'
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Data Overview',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default CategoryChart;
