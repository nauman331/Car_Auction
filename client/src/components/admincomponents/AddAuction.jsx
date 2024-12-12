import { useState } from "react";
import FormGrid from "./AddBuyNow/FormGrid";
import { useSelector } from "react-redux";

const AddAuctionForm = () => {
  const [formData, setFormData] = useState({
    auctionTitle: "",
    auctionNumber: "",
    auctionStatus: false,
    statusText: "",
    auctionDate: "",
    auctionTime: "",
    totalVehicles: "",
    location: "",
  });

  const { categories } = useSelector((state) => state.category);

  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  const AuctionFields = [
    {
      id: "auctionTitle",
      label: "Auction Title",
      type: "text",
      placeholder: "Enter auction title",
    },
    {
      id: "auctionNumber",
      label: "Auction Number",
      type: "text",
      placeholder: "Enter auction number",
    },
    {
      id: "totalVehicles",
      label: "Total Vehicles",
      type: "text",
      placeholder: "Enter total vehicles",
    },
    {
      id: "auctionDate",
      label: "Starting Date",
      type: "date",
    },
    {
      id: "auctionTime",
      label: "Starting Time",
      type: "time",
      placeholder: "Enter Time"
    },
    {
      id: "location",
      label: "Location",
      type: "select",
      options: generateOptions("auction-location", "auctionLocation"),
    },
  ];

  const handleUpload = () => {
    console.log("Auction Data:", auctionData);
    // Add form submission logic here
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
          <FormGrid fields={AuctionFields} formData={setFormData} setFormData={setFormData} />
          <button className="next-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default AddAuctionForm;
