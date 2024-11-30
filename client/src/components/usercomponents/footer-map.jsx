import React from "react";
import "../../assets/stylesheets/footer.scss";
const ProductsList = ({ title, items }) => {
  return (
    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 col-6">
      <div className="Products">
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
