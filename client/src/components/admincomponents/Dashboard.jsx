import React from "react";
import "../../assets/stylesheets/admin/dashboard.scss";
import { Car, Search, MessagesSquare, Bookmark, BellDot, MoveUpRight } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Sales",
        data: [3000, 4500, 4000, 5000, 6000, 7000, 7500, 8000, 9000, 8500, 9500, 10000],
        borderColor: "#405FF2",
        backgroundColor: "rgba(64, 95, 242, 0.1)",
        tension: 0.4, // Smooth curve
        borderWidth: 3,
        pointBorderColor: "#405FF2",
        pointBackgroundColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#405FF2",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(64, 95, 242, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 1,
        borderColor: "#405FF2",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#405FF2", font: { size: 12 } },
      },
      y: {
        grid: { color: "#E1E1E1", drawBorder: false },
        ticks: { color: "#405FF2", font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h4>Dashboard</h4>
      <small>Lorem ipsum dolor sit amet, consectetur.</small>

      <div className="info-boxes">
        {[{ title: "Listings", count: "65,984", Icon: Car, iconClass: "icon1" }, { title: "Searches", count: "24,780", Icon: Search, iconClass: "icon2" }, { title: "Messages", count: "12,345", Icon: MessagesSquare, iconClass: "icon3" }, { title: "Bookmarks", count: "9,876", Icon: Bookmark, iconClass: "icon4" }].map(({ title, count, Icon, iconClass }, idx) => (
          <div key={idx} className="info-box">
            <span>
              <small>{title}</small>
              <h4>{count}</h4>
            </span>
            <span className={iconClass}>
              <Icon />
            </span>
          </div>
        ))}
      </div>

      <div className="chart-and-notification">
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
        <div className="notifications">
          <h6>Bidding Notifications</h6>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
          <span className="notification">
          <BellDot color="#ff8181"/>
          <small>New notification</small>
          </span>
       <button>View More <MoveUpRight /></button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
