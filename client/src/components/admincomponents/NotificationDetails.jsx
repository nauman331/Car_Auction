import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import {
    MessagesSquare,
} from "lucide-react";

const NotificationDetails = () => {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);


    const getNotifications = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            setLoading(true)
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
            setLoading(false)
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
        getNotifications();
    }, [token]);

    if (loading) return <LoadingSpinner />;


    return (
        <>
            <div className="car-list-top">
                <div className="heading">
                    <h3>Notifications</h3>
                    <small>List of all the notifications</small>
                </div>
            </div>
            <div className="car-list-container container">
                <div className="chart-and-notification" >
                    <div className="notifications d-flex align-items-center flex-wrap w-100 h-auto col-5"
                        style={{ border: "none", columnGap: "1rem" }}>
                        {notifications?.map((notification) => (
                            <span
                                key={notification._id}
                                className={`notification ${notification.readStatus ? "read" : "unread"} px-4 py-2`}
                                onClick={() => handleNotificationClick(notification)}
                                style={{ border: "1px solid #e1e1e1" }}
                            >
                                <div className="icon3">
                                    <MessagesSquare />
                                </div>
                                <small>
                                    {notification.message.slice(0, 25) + (notification.message.length > 25 ? "..." : "")}
                                </small>

                            </span>
                        ))}
                    </div>
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
    )
}

export default NotificationDetails
