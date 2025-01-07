import React from "react";

const Item = (prop) => {
  return (
    <div className="data">
      <div className="information-image">
        <img src={prop.image} />
      </div>
      <div className="information-text">
        <h5>{prop.title}</h5>
        <p>{prop.text}</p>
      </div>
    </div>
  );
};

export default Item;
