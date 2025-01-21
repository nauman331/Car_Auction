import React from "react";
import "../../assets/stylesheets/contactusbutton.scss";

import img1 from "../../assets/images/smartphone 1.png";
import img2 from "../../assets/images/email 1.png";

const ContactButtons = () => {
  return (
    <div className="contact-container">
      <div className="contact-button">
        <span className="icon">
          <img src={img1} />
        </span>
        <span className="text">+971 509496511</span>
      </div>
      <div className="contact-button">
        <span className="icon">
          <img src={img2} />
        </span>
        <span className="text">
          Info@abaautoauctions.com
          {/* <a href="mailto:Info@abaautoauctions.com">Info@abaautoauctions.com</a> */}
        </span>
      </div>
    </div>
  );
};

export default ContactButtons;
