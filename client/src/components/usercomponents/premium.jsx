// import React, { useEffect } from "react";
import PremiumBrands from "../usercomponents/premiumbrands";
import "../../assets/stylesheets/premiumbrand.scss";
import img1 from "../../assets/images/premium 1.png";
import img2 from "../../assets/images/premium 2.png";
import img3 from "../../assets/images/premium 3.png";
import img4 from "../../assets/images/premium 4.png";
import img5 from "../../assets/images/premium 5.png";
import img6 from "../../assets/images/premium 6.png";
import img7 from "../../assets/images/right-up 1 (2).png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const brands = [
  { name: "Audi", image: img1 },
  { name: "BMW", image: img2 },
  { name: "Ford", image: img3 },
  { name: "Mercedes Benz", image: img4 },
  { name: "Peugeot", image: img5 },
  { name: "Volkswagen", image: img6 },
];

function Premium() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds
      // once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="container prenium-brand-section" data-aos="fade-up">
      <div className="prenium-brand-text">
        <h2>Explore Our Premium Brands</h2>
        <div className="brand-btn">
          <a href="#">
            Show All Brands
            <img src={img7} />
          </a>
        </div>
      </div>
      <PremiumBrands brands={brands} />
    </div>
  );
}

export default Premium;
