import React from "react";
import "../../assets/stylesheets/contactusbutton.scss";
import img1 from "../../assets/images/smartphone 1.png";
import img2 from "../../assets/images/email 1.png"

const ContactButtons = () => {
  return (
    <div className="contact-container">
      <div className="contact-button">
        <span className="icon">
          <img src={img1} />
        </span>
        <span className="text">+92 309 039 0631</span>
      </div>
      <div className="contact-button">
        <span className="icon">
          <img src={img2} />
        </span>
        <span className="text">info@abc.com</span>
      </div>
    </div>
  );
};

export default ContactButtons;
