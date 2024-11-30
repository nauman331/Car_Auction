import React from "react";
import PremiumBrands from "../usercomponents/premiumbrands";
import "../../assets/stylesheets/premiumbrand.scss";
const brands = [
  { name: "Audi", image: require("../images/premium 1.png") },
  { name: "BMW", image: require("../images/premium 2.png") },
  { name: "Ford", image: require("../images/premium 3.png") },
  { name: "Mercedes Benz", image: require("../images/premium 4.png") },
  { name: "Peugeot", image: require("../images/premium 5.png") },
  { name: "Volkswagen", image: require("../images/premium 6.png") },
];

function Premium() {
  return (
    <div className="container prenium-brand-section">
      <div className="prenium-brand-text">
        <h2>Explore Our Premium Brands</h2>
        <div className="brand-btn">
          <a href="#">
            Show All Brands
            <img src={require("../../images/right-up 1 (2).png")} />
          </a>
        </div>
      </div>
      <PremiumBrands brands={brands} />
    </div>
  );
}

export default Premium;
