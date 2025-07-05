import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/Exports";
import toast from "react-hot-toast";
import Loader from "../usercomponents/LoadingSpinner";

const ViemoLink = () => {
  const { token } = useSelector((state) => state.auth);
  const [vimeoLink, setVimeoLink] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editValue, setEditValue] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

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

  useEffect(() => {
    fetchVimeoLink();
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
    </div>
  );
};

export default ViemoLink;
