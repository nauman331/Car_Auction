import React from "react";
import "../../assets/stylesheets/aboutfeature.scss";

function AboutFeaturesSection({ features }) {
  return (
    <div className="features-section">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="feature-texts">
            <h2>Why Choose Us?</h2>
          </div>
        </div>
      </div>
      <div className="row">
        {features.map((feature, index) => (
          <div
            className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4"
            key={index}
          >
            <div className="feature-items ">
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

export default AboutFeaturesSection;
