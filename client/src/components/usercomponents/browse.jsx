import React from "react";
import "../../assets/stylesheets/browsebytpye.scss";

const CarCategories = ({ categories }) => {
  return (
    <div className="catageories">
      {categories.map((category) => (
        <div key={category.id} className="card">
          <div className="image">
            <img src={category.image} alt="" />{" "}
          </div>
          <div className="text">
            <h3>{category.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCategories;
