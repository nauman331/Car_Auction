import React from "react";
import "../../assets/stylesheets/footer.scss";

const ProductsList = ({ title, items }) => {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="Products">
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
