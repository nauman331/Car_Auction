import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartGraph = ({ periodicData }) => {
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Sales",
        data: new Array(12).fill(0), // Default empty data for all months
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
  });

  useEffect(() => {
    if (!periodicData || !Array.isArray(periodicData)) {
      console.warn("Invalid or missing periodicData:", periodicData);
      return;
    }

    const updatedData = new Array(12).fill(0); // Initialize with zeros
    periodicData.forEach((entry) => {
      if (entry.month >= 1 && entry.month <= 12) {
        updatedData[entry.month - 1] = entry.paidAmount || 0; // Update data based on month
      }
    });

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: updatedData,
        },
      ],
    }));
  }, [periodicData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#405FF2",
        bodyColor: "#405FF2",
        borderWidth: 1,
        borderColor: "#405FF2",
        cornerRadius: 5,
        displayColors: false,
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
          display: false,
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
          stepSize: 20000,
        },
        beginAtZero: true,
        max: 100000,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartGraph;
