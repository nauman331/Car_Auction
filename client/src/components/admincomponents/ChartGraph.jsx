import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Added for smooth area filling
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Sales",
        data: [100, 200, 180, 150, 180, 140, 180, 150, 160, 140, 200, 250], // Matching provided values
        borderColor: "#405FF2",
        backgroundColor: "rgba(64, 95, 242, 0.1)",
        tension: 0.4, // Smooth curve
        borderWidth: 3,
        pointBorderColor: "#405FF2",
        pointBackgroundColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
        pointBorderWidth: 2,
        fill: true, // Area fill
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable legend as it's not in the image
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#405FF2",
        bodyColor: "#405FF2",
        borderWidth: 1,
        borderColor: "#405FF2",
        cornerRadius: 5,
        xPadding: 10,
        yPadding: 10,
        displayColors: false, // Hide color box in tooltips
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No gridlines for x-axis
        },
        ticks: {
          color: "#888",
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: "#E1E1E1",
          drawBorder: false,
        },
        ticks: {
          color: "#888",
          font: { size: 12 },
          stepSize: 50, // Adjust step size
        },
        beginAtZero: true,
        max: 300, // Set a fixed max for better visualization
      },
    },
  };

  return (
    <div className="chart-container" >
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartGraph;
