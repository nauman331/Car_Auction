import React from "react";
import "../../assets/stylesheets/contactus.scss";
import img4 from "../../assets/images/right-up 1.png";
import Item from "./contactinformation";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/email.png";
import img3 from "../../assets/images/phones.png";
import img6 from "../../assets/images/facebook1.png";
import img5 from "../../assets/images/twitter1.png";
import "../../assets/stylesheets/FeatureCategory.scss";
import img7 from "../../assets/images/insta1.png";
import img8 from "../../assets/images/linkedin1.png";
import OfficeDetails from "../usercomponents/mapaddress";
const Form = () => {
  const carddatas = [
    {
      id: 1,
      image: img1,
      title: "Address",
      text: "329 Queensberry Street, North Melbourne VIC3051, Australia. ",
    },
    {
      id: 2,
      image: img2,
      title: "Email",
      text: "syedaasra@gmail.com",
    },
    {
      id: 3,
      image: img3,
      title: "Phone",
      text: "+76 956 039 967",
    },
  ];
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <div style={{ paddingBottom: 58, backgroundColor: "#050b20" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="home.js">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  ContactUs
                </li>
              </ol>
            </nav>
          </div>
          <div className="contact-section">
            <h2>Contact Us</h2>
            {/* Map Section */}
            <div className="map-section">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.6144832206683!2d55.63052427434091!3d25.317153477633887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f300290be463%3A0x4cc61e3cbadd06c!2sAl%20Bashayera%20Auto%20Auction!5e0!3m2!1sen!2s!4v1736312195050!5m2!1sen!2s" 
               width="100%" height="450" style={{border: "0"}} loading="lazy"
                referrerpolicy="no-referrer-when-downgrade" allowFullScreen=""></iframe>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="contact-form">
                <h2>Get In Touch</h2>
                <p>
                  Fill out the form below, and someone from our team will get
                  back to you shortly.
                </p>
                <form>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div className="wrapper--input">
                      <input
                        type="text"
                        autoComplete="off"
                        onChange={handleInputChange}
                        name="firstName"
                        placeholder="Syeda"
                        required
                      />
                      <label>First Name</label>
                    </div>
                    <div className="wrapper--input">
                      <input
                        type="text"
                        autoComplete="off"
                        onChange={handleInputChange}
                        name="lastName"
                        placeholder="Asra"
                        required
                      />
                      <label>LastName</label>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div className="wrapper--input input--email">
                      <input
                        type="email"
                        autoComplete="off"
                        name="email"
                        placeholder="syedaasra@gail.com"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Email</label>
                    </div>
                    <div className="wrapper--input">
                      <input
                        type="tel"
                        name="contact"
                        placeholder="+90 47458 27 3287 12"
                        onChange={handleInputChange}
                        required
                      />
                      <label>Phone</label>
                    </div>
                  </div>

                  <div className="wrapper">
                    <textarea
                      id="comment"
                      name="comment"
                      placeholder="Lorem Ipsum Dolar Sit Amet"
                      rows="4"
                    />
                    <label> Comment</label>
                  </div>
                  <div className="send-message-btn">
                    <a href="#">
                      Send Message <img src={img4} />
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="footerrightsection">
                <h2>Contact details</h2>
                <h5>
                  Etiam pharetra egestas interdum blandit viverra morbi
                  consequat mi non bibendum egestas quam egestas nulla.
                </h5>
                <div>
                  {carddatas.map((card, index) => (
                    <Item
                      key={index}
                      title={card.title}
                      image={card.image}
                      text={card.text}
                    />
                  ))}
                </div>
                <div className="follow-us-section">
                  <div className="follow-text">
                    <h3>Follow us</h3>
                  </div>
                  <div className="follow-us-imagesection">
                    <div className="follow-image">
                      <img src={img5} />
                    </div>
                    <div className="follow-image">
                      <img src={img6} />
                    </div>
                    <div className="follow-image">
                      <img src={img7} />
                    </div>
                    <div className="follow-image">
                      <img src={img8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <OfficeDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
