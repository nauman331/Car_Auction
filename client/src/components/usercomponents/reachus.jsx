import React from "react";
import ContactButtons from "../usercomponents/contactbutton";

import "../../assets/stylesheets/reachus.scss";
import img1 from "../../assets/images/image 178.png"
import img2 from "../../assets/images/right-up 1.png"
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
                329 Queensberry Street, North <br></br>Melbourne VIC3051,
                Australia.
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
