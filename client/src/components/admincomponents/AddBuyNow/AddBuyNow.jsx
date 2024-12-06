import React, { useState } from "react";
import StepsNavigation from "./StepsNavigation";
import StepContent from "./StepsContent";
import "../../../assets/stylesheets/admin/addbuynow.scss";

const AddBuyNow = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handleSubmit = () => alert("Form Submitted!");

  const steps = [
    { label: "Car Details" },
    { label: "Price" },
    { label: "Features" },
    { label: "Media" },
    { label: "Location" },
  ];

  return (
    <div className="form-container">
      <h5>Add New Buy Now Vehicle</h5>
      <small>Fill the form vehicles details below</small>
      <StepsNavigation steps={steps} currentStep={step} onStepChange={setStep} />
      <div className="form-section">
        <StepContent step={step} />
        <button
          className="next-button"
          onClick={step < steps.length ? handleNext : handleSubmit}
        >
          {step < steps.length ? `Next: ${steps[step].label}` : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default AddBuyNow;
