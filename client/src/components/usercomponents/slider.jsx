import React from "react";
import "../../assets/stylesheets/aboutus.scss";
import img1 from "../../assets/images/qote.png";
const Slider = (Items) => {
  return (
    <div className="item">
      <div className="quote">
        <img src={img1} />
        {/* <i class="fa-solid fa-quote-left"></i> */}
      </div>
      <div className="cards">
      <h5 className="title-text">{Items.title}</h5>
        <p className="texts">{Items.texts}</p>
        <div className="card-section ">
          <div className="imgss ">
            {/* style={{ width: "50px", height: "50px" }} */}
            <img src={Items.image} alt="" className="rounded-5" />
          </div>
          <div className="txts">
           
            <h5>{Items.text}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
