import React from "react";
import { Modal, Button } from "react-bootstrap";
import StepsNavigation from "./AddBuyNow/StepsNavigation";
import StepContent from "./AddBuyNow/StepsContent";

const EditModal = ({
  show,
  onClose,
  formData,
  setFormData,
  step,
  setStep,
  steps,
  submitHandler,
  images,
  setImages,
  sellingType,
  existingImages,
  setExistingImages,
  loading = false,
}) => {
  return (
    <Modal show={show} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <StepsNavigation steps={steps.map((label) => ({ label }))} currentStep={step} onStepChange={setStep} />
          <div className="form-section">
            <StepContent
              step={step}
              formData={formData}
              setFormData={setFormData}
              images={images}
              setImages={setImages}
              existingImages={existingImages}
              sellingType={sellingType}
              setExistingImages={setExistingImages}
            />
            <div className="navigation-buttons">
              <div className="next-button">
                <Button
                style={{backgroundColor: "#050b20"}}
                  onClick={step < steps.length ? () => setStep(step + 1) : submitHandler}
                  disabled={loading}
                >
                  {step < steps.length ? `Next: ${steps[step]}` : loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
