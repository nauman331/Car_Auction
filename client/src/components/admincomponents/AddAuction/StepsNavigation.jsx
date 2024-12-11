import React from "react";

const StepsNavigation = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="tab-navigation">
      {steps.map((step, idx) => (
        <span
          key={idx}
          className={currentStep === idx + 1 ? "active" : ""}
          onClick={() => onStepChange(idx + 1)}
        >
          {step.label}
        </span>
      ))}
    </div>
  );
};

export default StepsNavigation;
