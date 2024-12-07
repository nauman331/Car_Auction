import React from "react";
import "../../assets/stylesheets/admin/category.scss";
import { X } from "lucide-react";

const categories = [
  "Vehicle Types",
  "Vehicle Makes",
  "Vehicle Models",
  "Vehicle Years",
  "Drive Types",
  "Vehicle Transmission",
  "Vehicle Fuel Types",
  "Vehicle Cylinders",
  "Vehicle Engine Sizes",
  "Vehicle Colors",
  "Vehicle Doors",
  "Vehicle Damages",
  "Vehicle Features",
  "Auction Locations",
];

const CategoryManagement = () => {
  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Categories Management</h3>
          <small>Fill the form Categories Details Below</small>
        </span>
      </div>
      <div className="form-container">
        <div className="form-section">
          <div className="category-boxes">
            {categories.map((category, index) => (
              <div className="category-box" key={index}>
                <h5>{category}</h5>
                <div className="input-container">
                  <input type="text" placeholder="Sedan" id={`categorytype-${index}`} />
                  <label htmlFor={`categorytype-${index}`}>Enter Car Type</label>
                  <button type="submit">Add</button>
                </div>
                {Array(18)
                  .fill("Sedan")
                  .map((item, idx) => (
                    <h6 key={idx}>
                      {item} <span><X /></span>
                    </h6>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;
