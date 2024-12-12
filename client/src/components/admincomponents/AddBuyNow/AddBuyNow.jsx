import React, { useState } from "react";
import StepsNavigation from "./StepsNavigation";
import StepContent from "./StepsContent";
import "../../../assets/stylesheets/admin/addbuynow.scss";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { backendURL } from "../../../utils/Exports";

const AddBuyNow = ({ sellingType }) => {
  const { token, userdata } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);

  const baseData = {
    carImages: [],
    carMake: "",
    carModel: "",
    vendor: userdata.id,
    friendlyLocation: "",
    mapLocation: "",
    carType: "",
    description: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    driveType: "",
    damage: "",
    cylinders: "",
    engineSize: "",
    color: "",
    vin: "",
    noOfDoors: "",
    isSold: false,
    videoLink: "",
    features: { interior: [], exterior: [], safety: [], convenience: [], entertainment: [] },
  };

  const auctionData = sellingType === "auction"
    ? { auctionLot: "", lotNo: "", auctionStatus: false, startingBid: "", bidMargin: "", isVerified: true }
    : { price: "", discountedPrice: "", isVerified: false };

  const [formData, setFormData] = useState({ ...baseData, sellingType, ...auctionData });

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendURL}/car/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Car Added Successfully!");
        setFormData({ ...baseData, sellingType, ...auctionData });
        setStep(1);
      } else {
        toast.error(res_data?.errors?.[0]?.msg || res_data?.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting car data:", error);
    }
  };

  const steps = ["Car Details", "Price", "Features", "Media", "Location"];

  return (
    <div className="form-container">
      <h5>{sellingType === "fixed" ? "Add New Buy Now Vehicle" : "Add New Auction Vehicle"}</h5>
      <small>Fill the form vehicles details below</small>
      <StepsNavigation steps={steps.map(label => ({ label }))} currentStep={step} onStepChange={setStep} />
      <div className="form-section">
        <StepContent step={step} formData={formData} setFormData={setFormData} sellingType={sellingType} />
        <div className="navigation-buttons">
          <button
            className="next-button"
            onClick={step < steps.length ? () => setStep(step + 1) : handleSubmit}
          >
            {step < steps.length ? `Next: ${steps[step]}` : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBuyNow;
