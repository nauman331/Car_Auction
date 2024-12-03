import React, { useState } from "react";
import "../../assets/stylesheets/admin/addauction.scss";

const AddAuctionForm = () => {
  const [formData, setFormData] = useState({
    auctionTitle: "",
    auctionNumber: "",
    totalVehicles: "",
    startingDate: "",
    startingTime: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="auction-form-container">
      <h1>Add New Auction Event</h1>
      <p>Fill the form with auction details below</p>
      <form onSubmit={handleSubmit} className="auction-form">
        <div className="form-row">
          <div className="form-group">
            <label>Auction Title</label>
            <input
              type="text"
              name="auctionTitle"
              value={formData.auctionTitle}
              onChange={handleChange}
              placeholder="Enter Auction Title"
            />
          </div>
          <div className="form-group">
            <label>Auction Number</label>
            <input
              type="text"
              name="auctionNumber"
              value={formData.auctionNumber}
              onChange={handleChange}
              placeholder="Enter Auction Number"
            />
          </div>
          <div className="form-group">
            <label>Total Vehicles</label>
            <input
              type="text"
              name="totalVehicles"
              value={formData.totalVehicles}
              onChange={handleChange}
              placeholder="Enter Total Vehicles"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Starting Date</label>
            <select
              name="startingDate"
              value={formData.startingDate}
              onChange={handleChange}
            >
              <option value="">Select Date</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
          <div className="form-group">
            <label>Starting Time</label>
            <select
              name="startingTime"
              value={formData.startingTime}
              onChange={handleChange}
            >
              <option value="">Select Time</option>
              <option value="Make">Make</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="Model">Model</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Save & Preview
        </button>
      </form>
    </div>
  );
};

export default AddAuctionForm;
