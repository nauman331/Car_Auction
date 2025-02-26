import React from "react";
import "../../assets/stylesheets/browsebytpye.scss";

import { Link } from "react-router-dom";
const CarCategories = ({ categories }) => {
  return (
    <div className="catageories">
      {categories.map((category) => (
        <div key={category.id} className="card">
          <Link
            to="/auction-vehicle"
            key={category.id}
            className="category-card-link"
            style={{ textDecoration: "none" }}
          >
            <div className="image">
              <img src={category.image} alt="" />
            </div>

            <div className="text">
              <h3>{category.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CarCategories;
