
import React from "react";
import "../../assets/stylesheets/premiumbrand.scss";
import { Link } from "react-router-dom";

function PremiumBrands({ brands }) {
  return (
    <div className="premium-brands">
      <div className="row">
        {brands.map((brand, index) => (
          <div className="col-6 col-md-4 col-lg-2 text-center mb-3" key={index}>
            <Link
              to="/auction-vehicle"
              className="brand-card-link"
              style={{ textDecoration: "none" }}
            >
              <div className="brand-card">
                <img src={brand.image} className="img-fluid" alt={brand.name} />
                <h6>{brand.name}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PremiumBrands;
