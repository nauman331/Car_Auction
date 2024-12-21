import React, { useState } from "react";
import dayjs from "dayjs";
import FormGrid from "./AddBuyNow/FormGrid";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { useNavigate } from "react-router-dom";

const AddAuctionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    auctionTitle: "",
    auctionNumber: 0,
    auctionStatus: false,
    statusText: "Pending",
    auctionDate: null, // Ensure it's null initially for date pickers
    auctionTime: "", // Ensure time is a string
    totalVehicles: 0,
    location: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  // Generate options for location dropdown
  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  // Auction form fields
  const AuctionFields = [
    { id: "auctionTitle", label: "Auction Title", type: "text", placeholder: "Enter auction title" },
    { id: "auctionDate", label: "Starting Date", type: "date" },
    { id: "auctionTime", label: "Starting Time", type: "time", placeholder: "Enter time in hh:mm AM/PM format" },
    { id: "auctionNumber", label: "Auction Number", type: "number", placeholder: "Enter auction number" },
    { id: "totalVehicles", label: "Total Vehicles", type: "number", placeholder: "Enter total vehicles" },
    { id: "location", label: "Location", type: "select",placeholder: "Select Location", options: generateOptions("auction-location", "auctionLocation") },
  ];

  // Handle form submission
  const handleUpload = async () => {
    // Validate required fields
    if (!formData.auctionTitle || !formData.auctionDate || !formData.auctionTime) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate date and time formats
    if (!dayjs(formData.auctionDate).isValid()) {
      toast.error("Invalid date format.");
      return;
    }

    // Use 'hh:mm A' format to validate time
    if (!dayjs(formData.auctionTime, "hh:mm A", true).isValid()) {
      toast.error("Invalid time format. Please use hh:mm AM/PM.");
      return;
    }

    try {
      // Convert date to ISO and send time as 12-hour format string
      const auctionDateISO = dayjs(formData.auctionDate).toISOString();
      const auctionTimeString = dayjs(formData.auctionTime, "hh:mm A").format("hh:mm A");

      // Prepare data for the backend
      const auctionData = {
        ...formData,
        auctionDate: auctionDateISO,
        auctionTime: auctionTimeString,
      };

      // Send POST request to backend
      const response = await fetch(`${backendURL}/auction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(auctionData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Auction added successfully!");
        navigate("/admin/auctionlistings");
      } else {
        toast.error(data?.message || "Error occurred.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while adding the auction.");
    }
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Add New Auction Event</h3>
          <small>Fill the form Auction Details Below</small>
        </span>
      </div>
      <div className="form-container">
        <div className="form-section">
          <FormGrid fields={AuctionFields} formData={formData} setFormData={setFormData} />
          <div className="next-button">
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAuctionForm;
