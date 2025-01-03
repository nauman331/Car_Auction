import React, { useState } from "react";
import "../../assets/stylesheets/carddatatabs.scss";

import Vehicles from "../usercomponents/cardata";
import img from "../../assets/images/right-up 1 (2).png";
import { NavLink } from "react-router-dom";
const CarTabs = ({cars}) => {
  const [activeTab, setActiveTab] = useState("all");

  const toggleTab = (tabName) => {
    setActiveTab(tabName);
  };

 // Filter cars based on the active tab
 const filteredCars = cars.filter((car) => {
  if (activeTab === "all") return true; // Show all cars
  if (activeTab === "buyNow") return car.sellingType === "fixed"; // Fixed cars
  if (activeTab === "auction") return car.sellingType === "auction"; // Auction cars
  return false;
});


  return (
    <div className="explore-Allvehicles-section">
      <div className="container-xl">
        <div className="Explore-text-section">
          <h2>Explore All Vehicles</h2>
          <div className="view-btn">
          <NavLink to="/vehicle">
            View All
            <img src={img} />
          </NavLink>
          </div>
        </div>
        <div>
          {/* Tab Buttons */}
          <div className="tab-toggle">
            <button
              onClick={() => toggleTab("all")}
              className={activeTab === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => toggleTab("buyNow")}
              className={activeTab === "buyNow" ? "active" : ""}
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleTab("auction")}
              className={activeTab === "auction" ? "active" : ""}
            >
              Auction
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            <Vehicles cars={filteredCars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTabs;
