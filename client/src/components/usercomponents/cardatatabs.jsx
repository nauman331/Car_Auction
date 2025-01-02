import React, { useState } from "react";
import "../../assets/stylesheets/carddatatabs.scss";

import Vehicles from "../usercomponents/cardata";
import img from "../../assets/images/right-up 1 (2).png";
const CarTabs = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const toggleTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="explore-Allvehicles-section">
      <div className="container-xl">
        <div className="Explore-text-section">
          <h2>Explore All Vehicles</h2>
          <div className="view-btn">
            <a href="#">
              View All
              <img src={img} alt="right-up" />
            </a>
          </div>
        </div>
        <div>
          {/* Tab Buttons */}
          <div className="tab-toggle">
            <button
              onClick={() => toggleTab("featured")}
              className={activeTab === "featured" ? "active" : ""}
            >
              Featured Cars
            </button>
            <button
              onClick={() => toggleTab("recent")}
              className={activeTab === "recent" ? "active" : ""}
            >
              Recent Cars
            </button>
            <button
              onClick={() => toggleTab("popular")}
              className={activeTab === "popular" ? "active" : ""}
            >
              Popular Cars
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "featured" && (
              <div>
                <Vehicles />
              </div>
            )}
            {activeTab === "recent" && (
              <div>
                <Vehicles />
              </div>
            )}
            {activeTab === "popular" && (
              <div>
                <Vehicles />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTabs;
