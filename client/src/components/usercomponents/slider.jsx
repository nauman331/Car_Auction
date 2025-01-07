import React from "react";
import "../../assets/stylesheets/aboutus.scss";
const Slider = (Items) => {
  return (
    <div className="item">
      <div className="quote">
        <i class="fa-solid fa-quote-left"></i>
      </div>
      <div className="cards">
        <div className="card-section ">
          <div className="imgss ">
            {/* style={{ width: "50px", height: "50px" }} */}
            <img src={Items.image} alt="" className="rounded-5" />
          </div>
          <div className="txts">
            {" "}
            <h5>{Items.text}</h5>
          </div>
        </div>
        <div>
          <span>
            <i class="fa-sharp fa-solid fa-star checked"></i>
          </span>
          <span>
            <i class="fa-sharp fa-solid fa-star checked"></i>
          </span>
          <span>
            <i class="fa-sharp fa-solid fa-star checked"></i>
          </span>
          <span>
            <i class="fa-sharp fa-solid fa-star checked"></i>
          </span>
          <span>
            <i class="fa-sharp fa-light fa-star checked"></i>
          </span>
        </div>

        <p className="texts">{Items.texts}</p>
      </div>
    </div>
  );
};

export default Slider;
