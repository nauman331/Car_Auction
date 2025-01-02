import React from "react";
import ProductsList from "../usercomponents/footer-map";

import "../../assets/stylesheets/footer.scss";
import ContactButtons from "../usercomponents/contactbutton";
import img1 from "../../assets/images/apple.png";
import img2 from "../../assets/images/boxcars.png";
import img3 from "../../assets/images/google.png";
import img4 from "../../assets/images/facebook.png";
import img5 from "../../assets/images/twitter.png";
import img6 from "../../assets/images/insta.png";
import img7 from "../../assets/images/linkedin.png";
const Footer = () => {
  const productsData = [
    {
      title: "Company",
      items: ["About Us", "Careers", "Blog", "FAQs", "Finance", "Contact Us"],
    },
    {
      title: "Quick Links",
      items: ["Get in Touch", "Help cente", "Live chat", "How it works"],
    },
    {
      title: "Our Brands",
      items: [
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Ferrari",
        "Jaguar",
        "Lamborghini",
      ],
    },
    {
      title: "Vehicles Type",
      items: [
        "Pickup",
        "Coup",
        "Family MPV",
        "Sedan",
        "SUVs",
        "Sport Coupe",
        "Convertible",
        "Wagon",
      ],
    },
  ];
  return (
    <footer className="footer-section">
      <div className="container">
        <div
          className="row mb-5 py-5 align-item-baseline footer-mid-section"
          style={{ borderBottom: "1px solid #6b6c7e" }}
        >
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="footer-text">
              <div className="logo">
                <img src={img2} />
              </div>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt <br></br>in
                culpa qui officia deserunt mollit anim id es
              </p>
              <ContactButtons />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex footer-information-detail">
            <div className="footer-information">
              <h4>Join BoxCar</h4>
              <p>Receive pricing updates, shopping tips & more!</p>
              <div className="footer-inputs">
                <input type="text" placeholder="Your email address" required />
                <button>
                  <a href="#">Sign Up</a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="footertopsection">
              <div className="row">
                {productsData.map((product, index) => (
                  <ProductsList
                    key={index}
                    title={product.title}
                    items={product.items}
                  />
                ))}

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="mobileapp">
                    <h3>Our Mobile App</h3>
                    <div className="images">
                      <img src={img1} />
                      <img src={img3} />
                    </div>
                    <div className="contactwithus">
                      <h4>Connect With Us</h4>
                      <div className="icon-section">
                        <div className="icon-image">
                          <img src={img4} />
                        </div>
                        <div className="icon-image">
                          <img src={img5} />
                        </div>
                        <div className="icon-image">
                          <img src={img6} />
                        </div>
                        <div className="icon-image">
                          <img src={img7} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="copyright">
              <p>© 2023 Boxcars.com. All rights reserved.</p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="copyright">
              <p>
                <div className="copyright-terms">
                  <p>Terms & Conditions Privacy Notice</p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
