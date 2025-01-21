import React from "react";
import ProductsList from "../usercomponents/footer-map";

import "../../assets/stylesheets/footer.scss";
import ContactButtons from "../usercomponents/contactbutton";

import img2 from "../../assets/images/project logo light (1).svg";
const Footer = () => {
  const productsData = [
    {
      title: "Quick Links",
      items: [
        { label: "Home", link: "/" },
        { label: "About Us", link: "/about" },
        { label: "Contact Us", link: "/contactus" },
      ],
      // items: ["Home", "About Us", "Contact Us"],
    },
  ];
  return (
    <footer className="footer-section">
      <div className="container">
        <div
          className="row mb-5 py-1 align-item-baseline footer-mid-section"
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
              <div className="row">
                {productsData.map((product, index) => (
                  <ProductsList
                    key={index}
                    title={product.title}
                    items={product.items}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="copyright">
              <p>© 2023 al bashayera.com. All rights reserved.</p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="copyright">
              <p>
                <div className="copyright-terms">
                  {/* <p>Terms & Conditions | Privacy policy</p> */}
                  <p>
                    <a href="/terms">Terms & Conditions</a> |
                    <a href="/privacy">Privacy Policy</a>
                  </p>
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
