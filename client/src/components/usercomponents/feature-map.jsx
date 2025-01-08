import "../../assets/stylesheets/feature.scss";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function FeaturesSection({ features }) {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds
      // once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="features-section container" data-aos="fade-up">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="feature-text">
            <h2>What Sets Us Apart in Car Auctions</h2>
          </div>
        </div>
      </div>
      <div className="row">
        {features.map((feature, index) => (
          <div
            className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-4"
            key={index}
          >
            <div className="feature-item ">
              <div className="icon me-3">
                <img src={feature.image} />
              </div>
              <div className="text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
