import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Axios from '../Axios/Axios'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Tester', 'Developer', 'Designer'], // Your categories
    datasets: [
      {
        label: 'Number of Users',
        data: [0, 0, 0], // Initial empty data
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the API
    Axios
      .get('counts/')
      .then((response) => {
        const { total_testers, total_developers, total_designers } = response.data;

        // Update the chart data with API response
        setChartData({
          labels: ['Tester', 'Developer', 'Designer'], // Your categories
          datasets: [
            {
              label: 'Number of Users',
              data: [total_testers, total_developers, total_designers],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1,
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
        text: 'User Categories',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CategoryChart;
