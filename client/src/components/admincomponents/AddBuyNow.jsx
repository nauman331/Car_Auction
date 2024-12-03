import React, {useState} from "react";
import "../../assets/stylesheets/admin/addbuynow.scss";
import {Upload } from "lucide-react"

function AddBuyNow() {
    
  const [activeStep, setActiveStep] = useState("Car Details");
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];

  return (
    <div className="form-container">
      {/* Form Header */}
      <header className="form-header">
        {steps.map((step) => (
          <button
            key={step}
            className={`form-tab ${activeStep === step ? "active" : ""}`}
            onClick={() => setActiveStep(step)}
          >
            {step}
          </button>
        ))}
      </header>

      <form>
        {activeStep === "Car Details" && (
          <section className="form-section">
            <h2>Car Details</h2>
            <div className="grid">
              <input type="text" placeholder="Listing Title" />
              <input type="text" placeholder="VIN" />
              <select>
                <option>Select Damage</option>
              </select>
              <select>
                <option>Select Type</option>
              </select>
              <select>
                <option>Select Make</option>
              </select>
              <select>
                <option>Select Model</option>
              </select>
              <input type="number" placeholder="Mileage" />
              <select>
                <option>Select Fuel</option>
              </select>
              <select>
                <option>Select Transmission</option>
              </select>
              <input type="text" placeholder="Engine Size" />
              <select>
                <option>Select Color</option>
              </select>
              <textarea placeholder="Listing Description"></textarea>
            </div>
          </section>
        )}

        {activeStep === "Price" && (
          <section className="form-section">
            <h2>Price</h2>
            <div className="grid">
              <input type="text" placeholder="Buy Now Price" />
              <input type="text" placeholder="Discounted Price" />
            </div>
          </section>
        )}

{activeStep === "Features" && (
  <section className="form-section">
    <h2>Features</h2>
    <div className="features-grid">
      <div className="feature-category">
        <h4>Convenience</h4>
        <label>
          <input type="checkbox" /> Heated Seats
        </label>
        <label>
          <input type="checkbox" /> Heated Steering Wheel
        </label>
        <label>
          <input type="checkbox" /> Navigation System
        </label>
        <label>
          <input type="checkbox" /> Tyre Pressure Monitoring System
        </label>
      </div>

      <div className="feature-category">
        <h4>Entertainment</h4>
        <label>
          <input type="checkbox" /> Apple CarPlay/Android Auto
        </label>
        <label>
          <input type="checkbox" /> Bluetooth
        </label>
        <label>
          <input type="checkbox" /> HomeLink
        </label>
      </div>

      <div className="feature-category">
        <h4>Safety</h4>
        <label>
          <input type="checkbox" /> Airbag - Driver
        </label>
        <label>
          <input type="checkbox" /> Airbag - Passenger
        </label>
        <label>
          <input type="checkbox" /> Anti-lock Braking System
        </label>
        <label>
          <input type="checkbox" /> Backup Camera
        </label>
      </div>

      <div className="feature-category">
        <h4>Interior</h4>
        <label>
          <input type="checkbox" /> Center Console
        </label>
        <label>
          <input type="checkbox" /> Heated and Ventilated Front Seats
        </label>
        <label>
          <input type="checkbox" /> Panoramic Moonroof
        </label>
        <label>
          <input type="checkbox" /> Qi Wireless Charging
        </label>
      </div>

      <div className="feature-category">
        <h4>Exterior</h4>
        <label>
          <input type="checkbox" /> Alloy Wheels
        </label>
        <label>
          <input type="checkbox" /> Brake Calipers - Silver Painted
        </label>
        <label>
          <input type="checkbox" /> Rear Diffuser Body Colour
        </label>
        <label>
          <input type="checkbox" /> Windows - Electric Front
        </label>
      </div>
    </div>
  </section>
)}

{activeStep === "Media" && (
  <section className="form-section">
    <h2>Media</h2>
    <div className="media-section">
      <div className="gallery">
        <div className="image-upload">
        <Upload className="upload-icon"/>
        </div>
        <div className="image-upload">
          <Upload className="upload-icon"/>
        </div>
        <div className="image-upload">
          <Upload className="upload-icon"/>
        </div>
        <div className="image-upload upload-box">Upload</div>
      </div>

      <div className="attachments">
        <div className="attachment-box">
          <button>View VIN Report</button>
        </div>
        <div className="attachment-box">
          <button>Car Brochure</button>
        </div>
        <div className="attachment-box upload-box">Upload</div>
      </div>

      <div className="video-link">
        <input type="text" placeholder="Enter YouTube or Vimeo URL" />
      </div>
    </div>
  </section>
)}

        {activeStep === "Location" && (
          <section className="form-section">
            <h2>Location</h2>
            <div className="grid">
              <input type="text" placeholder="Friendly Address" />
              <input type="text" placeholder="Map Location" />
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <button
            type="button"
            onClick={() =>
              setActiveStep(steps[Math.max(steps.indexOf(activeStep) - 1, 0)])
            }
            disabled={activeStep === steps[0]}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveStep(
                steps[Math.min(steps.indexOf(activeStep) + 1, steps.length - 1)]
              )
            }
            disabled={activeStep === steps[steps.length - 1]}
          >
            Next
          </button>
        </div>
      </form>
    </div>

  );
}

export default AddBuyNow;
