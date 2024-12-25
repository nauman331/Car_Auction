import React from "react";
import img1 from "../../assets/images/features-icon.png";
const FeatureCategory = ({ title, features }) => (
  <div>
    <h3>{title}</h3>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>
          <img src={img1} />
          {/* <img src={require("../images/features-icon.png")} /> */}
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default FeatureCategory;
