// Dashboard.js
import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/dashboard.scss";
import {
  Car,
  Gavel,
  MessagesSquare,
  ShoppingCart,
  MoveUpRight,
  HandCoins
} from "lucide-react";
import ChartGraph from "./ChartGraph";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";

const Dashboard = () => {
  const { token, userdata } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const getData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/dashboard/admin`, {
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

  const getNotifications = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/notification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data)
        setNotifications(res_data);
      }
    } catch (error) {
      console.error("Error while getting notifications");
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/notification`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, readStatus: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error while marking notification as read");
    }
  };

  useEffect(() => {
    getData();
    getNotifications();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  if (!data) return <p>No data available</p>;

  return (
    <>
      <div className="dashboard-text">
        <h4>Dashboard</h4>
        <small>Whole Progress of Data</small>
      </div>

      <div className="info-boxes">
      {[
          {
            title: "Listings",
            count: data?.totalCars || "N/A",
            Icon: Car,
            iconClass: "icon1",
          },
          {
            title: "Auctions",
            count: data?.totalAuctions || "N/A",
            Icon: Gavel,
            iconClass: "icon2",
          },
          {
            title: "Revenue",
            count: `AED ${formatNumber(data?.totalRevenue || 0)}`,
            Icon: HandCoins,
            iconClass: "icon3",
          },
          {
            title: "Orders",
            count: data?.purchase || "N/A",
            Icon: ShoppingCart,
            iconClass: "icon4",
          },
        ].map(({ title, count, Icon, iconClass }, idx) => (
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
        <ChartGraph periodicData={data?.periodicData || []} />
        <div className="notifications">
  <h6>Bidding Notifications</h6>
  {notifications?.slice(0, 6).map(({ _id, message, readStatus, userId }) => (
    userdata.id === userId && (
      <span
        key={_id}
        className={`notification ${readStatus ? "read" : "unread"}`}
        onClick={() => markNotificationAsRead(_id)}
      >
        <div className="icon3">
          <MessagesSquare />
        </div>
        <small>{message}</small>
      </span>
    )
  ))}
  {notifications?.length > 6 && (
    <button onClick={() => setShowModal(true)}>
      View All <MoveUpRight />
    </button>
  )}
</div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">All Notifications</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="notifications">
  <h6>Bidding Notifications</h6>
  {notifications?.slice(0, 6).map(({ _id, message, readStatus, userId }) => (
    userdata.id === userId && (
      <span
        key={_id}
        className={`notification ${readStatus ? "read" : "unread"}`}
        onClick={() => markNotificationAsRead(_id)}
      >
        <div className="icon3">
          <MessagesSquare />
        </div>
        <small>{message}</small>
      </span>
    )
  ))}
  {notifications?.length > 7 && (
    <button onClick={() => setShowModal(true)}>
      View All <MoveUpRight />
    </button>
  )}
</div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
