import React from "react";
import img1 from "../../assets/images/features-icon.png";
const FeatureCategory = ({ title, features }) => (
  <div>
    <h3 style={{textTransform: "capitalize"}}>{title || "No Title"}</h3>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>
          <img src={img1} />
          {feature || "No feature"}
        </li>
      ))}
    </ul>
  </div>
);

export default FeatureCategory;
