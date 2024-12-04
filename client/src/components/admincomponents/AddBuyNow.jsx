import React, { useState } from "react";
import "../../assets/stylesheets/admin/addbuynow.scss";
import { Upload, FileText, Image, Link2 } from "lucide-react";

const AddBuyNow = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));

  return (
    <div className="form-container">
      <h5>Add New Buy Now Vehicle</h5>

      {/* Header Tabs */}
      <div className="tab-navigation">
        {["Details", "Price", "Features", "Media", "Location"].map((tab, index) => (
          <span
            key={index}
            className={step === index + 1 ? "active" : ""}
            onClick={() => setStep(index + 1)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Form Sections */}
      {step === 1 && (
        <div className="form-section">
          <div className="form-grid">
            <input placeholder="Listing Title" />
            <input placeholder="VIN" />
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
            <select>
              <option>Select Year</option>
            </select>
            <select>
              <option>Select Drive Type</option>
            </select>
            <select>
              <option>Select Transmission</option>
            </select>
            <input placeholder="Mileage" />
            <select>
              <option>Select Fuel</option>
            </select>
            <input placeholder="Engine Size" />
            <select>
              <option>Select Cylinder</option>
            </select>
            <select>
              <option>Select Color</option>
            </select>
            <select>
              <option>Select Door</option>
            </select>
            <textarea placeholder="Listing Description"></textarea>
            <button className="next-button" onClick={handleNext}>
            Next: Price
          </button>
          </div>
         
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <div className="form-grid">
            <input placeholder="Buy Now Price" />
            <input placeholder="Discounted Price" />
          </div>
          <button className="next-button" onClick={handleNext}>
            Next: Features
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="form-section">
          <div className="feature-grid">
            {[
              { title: "Convenience", items: ["Heated Seats", "Heated Steering Wheel", "Navigation System", "Tyre Pressure Monitoring System"] },
              { title: "Entertainment", items: ["Apple CarPlay/Android Auto", "Bluetooth", "Home Link"] },
              { title: "Safety", items: ["Airbag - Driver", "Airbag - Passenger", "Anti-Lock Breaking System", "Backup Camera", "Blind Spot Monitor"] },
              { title: "Interior", items: ["Center Console", "Heated and Ventilated Front Seats", "Panoramic Moonroof", "Qi Wireless Charging", "Touch Screen Display"] },
              { title: "Exterior", items: ["Alloy Wheels", "Brake Calipers - Silver Painted", "Rear Bumper High Gloss", "Rear Diffuser Body Color", "Windows - Electric Front"] },
            ].map((group, idx) => (
              <div key={idx}>
                <h5>{group.title}</h5>
                {group.items.map((item, index) => (
                  <label key={index}>
                    <input type="checkbox" /> <small>{item}</small>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <button className="next-button" onClick={handleNext}>
            Next: Media
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="form-section">
          <div className="media-gallery">
            <div className="image-box">
              <Image size={24} />
            </div>
            <div className="image-box">
              <Image size={24} />
            </div>
            <div className="image-box">
              <Image size={24} />
            </div>
            <div className="image-box upload">
              <Upload size={24} />
              <span>Upload</span>
            </div>
          </div>
          <div className="video-link">
            <Link2 size={20} />
            <input placeholder="Enter YouTube or Vimeo URL" />
          </div>
          <button className="next-button" onClick={handleNext}>
            Next: Location
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="form-section">
          <div className="form-grid">
            <input placeholder="Friendly Address" />
            <input placeholder="Map Location" />
          </div>
          <button className="next-button" onClick={() => alert("Form Submitted!")}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBuyNow;
