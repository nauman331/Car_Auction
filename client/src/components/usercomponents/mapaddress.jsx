import React from "react";
import img2 from "../../assets/images/email.png";
import img1 from "../../assets/images/phones.png";
import img4 from "../../assets/images/right-up 1 (3).png";

import "../../assets/stylesheets/contactus.scss";
const officeData = [
  {
    city: "San Francisco",
    address: "329 Queensberry Street, North Melbourne VIC3051, Australia",
    email: "ali@boxcars.com",
    phone: "+76 956 039 967",
  },
  {
    city: "New York",
    address: "329 Queensberry Street, North Melbourne VIC3051, Australia",
    email: "ali@boxcars.com",
    phone: "+76 956 039 967",
  },
  {
    city: "London",
    address: "329 Queensberry Street, North Melbourne VIC3051, Australia",
    email: "ali@boxcars.com",
    phone: "+76 956 039 967",
  },
];

const OfficeDetails = () => {
  return (
    <div className="ouroffice-information-section">
      <h2>Our Offices</h2>

      <div className="row">
        {officeData.map((office, index) => (
          <div
            key={office.city}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            style={{ marginBottom: "2rem" }}
          >
            <h3>{office.city}</h3>
            <p>{office.address}</p>
            <a href="#">
              See on Map
              <img src={img4} />
            </a>
            <div className="d-flex office-details">
              <div className="office-mail">
                <span className="material-icons">
                  <img src={img2} alt="Email Icon" />
                </span>
                <span className="office-text">{office.email}</span>
              </div>
              <div className="office-mail">
                <span className="material-icons">
                  <img src={img1} alt="Phone Icon" />
                </span>
                <span className="office-text">{office.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeDetails;
