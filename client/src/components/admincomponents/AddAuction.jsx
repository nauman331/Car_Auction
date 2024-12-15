import { useState } from "react";
import FormGrid from "./AddBuyNow/FormGrid";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast"
import {backendURL} from "../../utils/Exports"
import {addAuction} from "../../store/slices/categorySlice"


const AddAuctionForm = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    auctionTitle: "",
    auctionNumber: 0,
    auctionStatus: false,
    statusText: "",
    auctionDate: "",
    auctionTime: "",
    totalVehicles: 0,
    location: ""
  });

  const { categories } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

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
      id: "statusText",
      label: "Status Text",
      type: "text",
      placeholder: "Enter status Text",
    },
    {
      id: "auctionNumber",
      label: "Auction Number",
      type: "number",
      placeholder: "Enter auction number",
    },
    {
      id: "totalVehicles",
      label: "Total Vehicles",
      type: "number",
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

  const handleUpload = async () => {
    const authorizationToken = `Bearer ${token}`;
  
    const auctionDateTime = new Date(`${formData.auctionDate}T${formData.auctionTime}:00`);
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    
    const formattedTime = auctionDateTime.toLocaleTimeString('en-US', options);
  
    // Convert the auctionDate to ISO format (you already did this)
    formData.auctionDate = new Date(formData.auctionDate).toISOString();
    
    // Add the formatted time to the formData
    formData.auctionTime = formattedTime;
  
    if (!formData.statusText) {
      toast.error("Status Text is required.");
      return;
    }
  
    if (!formData.auctionTime) {
      toast.error("Auction Time is required.");
      return;
    }
  
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
  
      if (response.ok) {
        toast.success("Auction Event Added Successfully");
        console.log(res_data)
        dispatch(addAuction({auction: res_data}))
      } else {
        toast.error(res_data?.errors?.[0]?.msg || res_data?.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error("Error in setting auction");
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
          <button className="next-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default AddAuctionForm;
