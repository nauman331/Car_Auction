import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/Exports";
import toast from "react-hot-toast";
import Loader from "../usercomponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ViemoLink = () => {
  const { token } = useSelector((state) => state.auth);
  const [vimeoLink, setVimeoLink] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [currentCarId, setCurrentCarId] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();

  const fetchVimeoLink = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendURL}/vimeo/vimeo-link`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Vimeo link");
      }
      const data = await response.json();
      setId(data._id || "");
      setVimeoLink(data.url || "");
      setEditValue(data.url || "");
    } catch (error) {
      setError(error.message);
      setVimeoLink("");
      setEditValue("");
      setId("");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch current live car ID for Buyer Car View
  const fetchCurrentCarId = async () => {
    try {
      const response = await fetch(`${backendURL}/auction/active-car`, {
        method: "GET",
        headers,
      });
      const res_data = await response.json();
      if (response.ok && res_data && res_data._id) {
        setCurrentCarId(res_data._id);
      } else {
        setCurrentCarId("");
      }
    } catch (error) {
      setCurrentCarId("");
    }
  };

  useEffect(() => {
    fetchVimeoLink();
    fetchCurrentCarId();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendURL}/vimeo/vimeo-link/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ url: editValue }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update Vimeo link");
      }
      toast.success("Vimeo link updated");
      setVimeoLink(editValue);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToBuyerCar = (e) => {
    e.preventDefault();
    if (currentCarId) {
      navigate(`/carsalesbuyer/${currentCarId}`);
    } else {
      toast.error("No live car available.");
    }
  };

  return (
    <div>
      <h3>Edit Vimeo Link</h3>
      <div className="form-container container">
        <form onSubmit={handleUpdate} className="form-section">
          <div className="form-grid">
            <div className="input-container">
              <input
                type="text"
                id="vimeo-link"
                value={editValue}
                onChange={handleInputChange}
                name="vimeoLink"
                placeholder="Enter Vimeo Link"
                disabled={isLoading}
              />
              <label htmlFor="vimeo-link">Vimeo Link</label>
            </div>
          </div>
          <div
            className="next-button"
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button
              type="submit"
              style={{ backgroundColor: "#405FF2" }}
              disabled={isLoading}
            >
              {vimeoLink ? "Update" : "Add"} Link
            </button>
          </div>
        </form>
        {isLoading && <Loader />}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
        {vimeoLink && !isLoading && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Current Vimeo Link:</strong>{" "}
            <a href={vimeoLink} target="_blank" rel="noopener noreferrer">
              {vimeoLink}
            </a>
          </div>
        )}
      </div>

      {/* --- Buyer Car View Section --- */}
      <div
        style={{
          marginTop: "2.5rem",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          background: "#f8faff",
          boxShadow: "0 4px 24px rgba(64,95,242,0.10)",
          maxWidth: 480,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: currentCarId ? "#34d399" : "#d1d5db",
              boxShadow: currentCarId ? "0 0 8px #34d399" : "none",
              border: currentCarId ? "2px solid #10b981" : "2px solid #d1d5db",
              marginRight: 4,
            }}
          />
          <span
            style={{
              color: currentCarId ? "#10b981" : "#aaa",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.03em",
            }}
          >
            {currentCarId ? "Live Car Available" : "No Live Car"}
          </span>
        </div>
        <h4
          style={{
            marginBottom: "1.2rem",
            color: "#405FF2",
            fontWeight: 700,
            fontSize: "1.35rem",
            letterSpacing: "0.01em",
          }}
        >
          Go to Buyer Car View
        </h4>
        <div
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: "12px",
            padding: "1.1rem 1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 2px 8px rgba(64,95,242,0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: currentCarId
              ? "1.5px solid #10b981"
              : "1.5px solid #e5e7eb",
            minHeight: 56,
          }}
        >
          <span
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              fontWeight: 500,
              marginBottom: "0.3rem",
              letterSpacing: "0.01em",
            }}
          >
            Live Car ID
          </span>
          <span
            style={{
              fontSize: "1.15rem",
              color: currentCarId ? "#222" : "#aaa",
              fontWeight: 600,
              wordBreak: "break-all",
              letterSpacing: "0.01em",
            }}
          >
            {currentCarId ? currentCarId : "No live car"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleGoToBuyerCar}
          style={{
            background: currentCarId
              ? "linear-gradient(90deg,#405FF2 0%,#4f8cff 100%)"
              : "#d1d5db",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "0.9rem 0",
            fontWeight: 700,
            fontSize: "1.08rem",
            width: "100%",
            cursor: currentCarId ? "pointer" : "not-allowed",
            opacity: currentCarId ? 1 : 0.7,
            boxShadow: currentCarId ? "0 2px 8px rgba(64,95,242,0.13)" : "none",
            transition: "all 0.2s",
            letterSpacing: "0.01em",
          }}
          disabled={!currentCarId}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <svg width="20" height="20" fill="none" style={{ marginRight: 2 }}>
              <circle cx="10" cy="10" r="10" fill="#fff" fillOpacity="0.12" />
              <path d="M8 6l5 4-5 4V6z" fill="#fff" />
            </svg>
            Go to Buyer Car View
          </span>
        </button>
      </div>
    </div>
  );
};

export default ViemoLink;
