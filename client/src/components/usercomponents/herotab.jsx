import React, { useState } from "react";
import "../../assets/stylesheets/carddatatabs.scss";


const HeroTabs = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const toggleTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="hero-tab-toggle">
        <button
          onClick={() => toggleTab("featured")}
          className={activeTab === "featured" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => toggleTab("recent")}
          className={activeTab === "recent" ? "active" : ""}
        >
          New
        </button>
        <button
          onClick={() => toggleTab("popular")}
          className={activeTab === "popular" ? "active" : ""}
        >
          Used
        </button>
      </div>

      {/* Tab Content */}
      <div className="hero-tab-content">
        {activeTab === "featured" && <div>{/* <Vehicles /> */}</div>}
        {activeTab === "recent" && <div>{/* <Vehicles /> */}</div>}
        {activeTab === "popular" && <div>{/* <Vehicles /> */}</div>}
      </div>
    </div>
  );
};

export default HeroTabs;
