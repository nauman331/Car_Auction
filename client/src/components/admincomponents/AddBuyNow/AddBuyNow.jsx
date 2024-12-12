import React, { useState } from "react";
import StepsNavigation from "./StepsNavigation";
import StepContent from "./StepsContent";
import "../../../assets/stylesheets/admin/addbuynow.scss";
import toast from "react-hot-toast";
import {useSelector} from "react-redux"
import {backendURL} from "../../../utils/Exports"
const AddBuyNow = ({type}) => {
  const {token, userdata} = useSelector((state)=>state.auth)
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    carImages: [],
    carMake: "",
    carModal: "",
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
    price: "",
    discountedPrice: "",
    sellingType: type,
    noOfDoors: "",
    isVerified: false,
    isSold: false,
    videoLink: "",
    features: {
        interior: [],
        exterior: [],
        safety: [],
        convenience: [],
        entertainment: []
    }
});

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));

  const handleSubmit = async () => {
    const authorizatioToken = `Bearer ${token}`
    try {
      const response = await fetch(`${backendURL}/car/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizatioToken
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Car Added Successfully!");
        setFormData({
          carImages: [],
          carMake: "",
          carModel: "",
          vendor: "",
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
          videoLink: "",
          vin: "",
          price: "",
          discountedPrice: "",
          sellingType: "fixed",
          noOfDoors: "",
          isVerified: false,
          soldDate: "",
          isSold: false,
          features: {
            interior: [],
            exterior: [],
            safety: [],
            convenience: [],
            entertainment: [],
          },
        });
        setStep(1);
      } else {
        toast.error(res_data.errors[0].msg ||res_data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting car data:", error);
    }
  };

  const steps = [
    { label: "Car Details" },
    { label: "Price" },
    { label: "Features" },
    { label: "Media" },
    { label: "Location" },
  ];

  return (
    <div className="form-container">
      <h5>{type === "fixed" ? "Add New Buy Now Vehicle" : "Add New Auction Vehicle"}</h5>
      
      <small>Fill the form vehicles details below</small>
      <StepsNavigation steps={steps} currentStep={step} onStepChange={setStep} />
      <div className="form-section">
        <StepContent step={step} formData={formData} setFormData={setFormData} />
        <div className="navigation-buttons">
          <button
            className="next-button"
            onClick={step < steps.length ? handleNext : handleSubmit}
          >
            {step < steps.length ? `Next: ${steps[step].label}` : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBuyNow;
