import React from "react";
import ContactButtons from "../usercomponents/contactbutton";
import "../../assets/stylesheets/reachus.scss";
const Reachus = () => {
  return (
    <section className="Reachus">
      <div className="container-reachus">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="reachus-image">
              <img src={require("../../images/image 178.png")} />
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
                  <img src={require("../../images/right-up 1.png")} />
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
