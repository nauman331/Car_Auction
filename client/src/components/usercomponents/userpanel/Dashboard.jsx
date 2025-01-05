import React, { useState, useEffect } from "react";
import "../../../assets/stylesheets/admin/dashboard.scss";
import {
  Car,
  Gavel,
  MessagesSquare,
  ShoppingCart,
  MoveUpRight,
  HandCoins,
} from "lucide-react";
import ChartGraph from "./ChartGraph";
import { useSelector } from "react-redux";
import { backendURL } from "../../../utils/Exports";
import LoadingSpinner from "../LoadingSpinner";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M"; // Million
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K"; // Thousand
    return num; // Less than a thousand
  };

  const getData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/dashboard/buyer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setData(res_data);
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  if (!data) return <p>No data available</p>;

  return (
    <>
      <h4>Dashboard</h4>
      <small>Whole Progress of Data</small>
      <div className="info-boxes">
  {[
    { title: "Purchase", count: data?.purchase || "N/A", Icon: ShoppingCart, iconClass: "icon1" },
    {
      title: "Spent",
      count: `AED ${formatNumber(data?.totalSpent || 0)}`,
      Icon: HandCoins,
      iconClass: "icon3",
    },
  ].map(({ title, count, Icon, iconClass }, idx) => (
    <div key={idx} className="info-box" style={{width:"29rem"}}>
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
        <ChartGraph periodicData={data?.periodicData || []} />
        <div className="notifications">
          <h6>Bidding Notifications</h6>
          {[...Array(7)].map((_, idx) => (
            <span key={idx} className="notification">
              <div className="icon3">
                <MessagesSquare />
              </div>
              <small>New notification Check Messages</small>
            </span>
          ))}
          <button>
            View More <MoveUpRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
