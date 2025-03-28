// Dashboard.js
import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/dashboard.scss";
import {
  Car,
  Gavel,
  ShoppingCart,
  MoveUpRight,
  HandCoins,
  MessagesSquare,
} from "lucide-react";
import ChartGraph from "./ChartGraph";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const getData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setDataLoading(true);
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
      setDataLoading(false);
    }
  };

  const getNotifications = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setNotificationsLoading(true);
      const response = await fetch(`${backendURL}/notification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setNotifications(res_data);
      }
    } catch (error) {
      console.error("Error while getting notifications");
    } finally {
      setNotificationsLoading(false);
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
        body: JSON.stringify({ notificationId }),
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, readStatus: true }
              : notification
          )
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error while marking notification as read");
    }
  };


  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);

    // Mark as read if not already marked
    if (!notification.readStatus) {
      markNotificationAsRead(notification._id);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
      getNotifications();
    }
  }, [token]);


  if (dataLoading || notificationsLoading) return <LoadingSpinner />;


  if (!data) return <p>No data available</p>;

  return (
    <>
      <div className="dashboard-text">
        <h4>Dashboard</h4>
        <small>Whole Progress of Data</small>
      </div>

      <div className="info-boxes">
        {[{
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
          <h6>Notifications</h6>
          {notifications?.slice(0, 6).map((notification) => (
            <span
              key={notification._id}
              className={`notification ${notification.readStatus ? "read" : "unread"}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="icon3">
                <MessagesSquare />
              </div>
              <small>
              {notification.message.slice(0, 25) + (notification.message.length > 25 ? "..." : "")}
              </small>

            </span>
          ))}
          {notifications?.length > 6 && (
            <button onClick={() => navigate("/admin/notifications")}>
              See More <MoveUpRight />
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedNotification && (
        <div
          className={`modal fade show`}
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notification Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedNotification.message}</p>
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
