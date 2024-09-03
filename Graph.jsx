import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components to use with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeightProgressChart() {
  // Dummy data for weight progress
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // X-axis labels (weeks)
    datasets: [
      {
        label: 'Weight Progress (lbs)', // Label for the dataset
        data: [200, 198, 195, 193, 192, 190], // Dummy weight data points
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill under the line
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the data points
        pointBorderColor: '#fff', // Border color of the data points
        tension: 0.4, // Curviness of the line (0 = straight lines)
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Weight Progress Over Time', // Chart title
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} lbs`, // Customize tooltip text
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        beginAtZero: false, // Start the Y-axis from the lowest data point
        title: {
          display: true,
          text: 'Weight (lbs)',
        },
        suggestedMin: 189, // Minimum value shown on the Y-axis
        suggestedMax: 202, // Maximum value shown on the Y-axis
        grid: {
          display: true, // Show grid lines
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
