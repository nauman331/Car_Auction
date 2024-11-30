import React from "react";
import "../../assets/stylesheets/contactusbutton.scss";

const ContactButtons = () => {
  return (
    <div className="contact-container">
      <div className="contact-button">
        <span className="icon">
          <img src={require("../../images/smartphone 1.png")} />
        </span>
        <span className="text">+92 309 039 0631</span>
      </div>
      <div className="contact-button">
        <span className="icon">
          <img src={require("../../images/email 1.png")} />
        </span>
        <span className="text">info@abc.com</span>
      </div>
    </div>
  );
};

export default ContactButtons;
