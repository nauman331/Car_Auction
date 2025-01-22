import React from "react";
import ContactButtons from "../usercomponents/contactbutton";

import "../../assets/stylesheets/reachus.scss";
import img1 from "../../assets/images/Contact Us Homepage .jpg";
import img2 from "../../assets/images/right-up 1.png";
const Reachus = () => {
  return (
    <section className="Reachus">
      <div className="container-reachus">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="reachus-image">
              <img src={img1} />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="reachus-text">
              <h2>
                Have more questions?Don’t hesitate <br></br>to reach us
              </h2>
              <p>
                Land # 6401-1 & 6401-2 - Emirates road - Al Sajaah - Emirates
                Industrial City - Sharjah.
              </p>
              <div>
                <ContactButtons />
              </div>
              <div className="reachus-btn">
                <a href="#">
                  Contact Us
                  <img src={img2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reachus;
