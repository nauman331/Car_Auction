import React, { useState } from "react";
import "../../assets/stylesheets/contactus.scss";
import img4 from "../../assets/images/right-up 1.png";
import Item from "./contactinformation";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/email.png";
import img3 from "../../assets/images/phones.png";
import img6 from "../../assets/images/facebook1.png";
import img5 from "../../assets/images/tiktok.png";
import "../../assets/stylesheets/FeatureCategory.scss";
import img7 from "../../assets/images/insta1.png";
import { backendURL } from "../../utils/Exports"

// import OfficeDetails from "../usercomponents/mapaddress";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
const Form = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    comment: ""
  })
  const carddatas = [
    {
      id: 1,
      image: img1,
      title: "Address",
      text: "Land # 6401-1 & 6401-2 - Emirates road - Al Sajaah - Emirates Industrial City - Sharjah. ",
    },
    {
      id: 2,
      image: img2,
      title: "Email",
      text: "Info@abaautoauctions.com",
    },
    {
      id: 3,
      image: img3,
      title: "Phone",
      text: "+971 509496511",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/contact`, {
        method: "POST",
        body: JSON.stringify(user)
      })
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message)
        setUser({
          firstName: "",
          lastName: "",
          contact: "",
          email: "",
          comment: ""
        })
      } else {
        toast.error(res_data.message)
      }
    } catch (error) {
      toast.error("Error while Submitting")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      <div style={{ paddingBottom: 40, backgroundColor: "#050b20" }}></div>
      <div className="mb-5  main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {/* <a href="home.js">Home</a> */}
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact Us
                </li>
              </ol>
            </nav>
          </div>
          <div className="contact-section">
            <h1>Contact Us</h1>
            {/* Map Section */}
            <div className="map-section">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.872967229859!2d55.63884257349611!3d25.342043428151655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f316c53fb759%3A0x3554e11696d9a3a4!2sAl%20bashayera%20Auto%20Auction!5e0!3m2!1sen!2s!4v1737528498186!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
          <div className="row mb-5" style={{ marginTop: "98px" }}>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="contact-form">
                <h2>Get In Touch</h2>
                <p>
                  Fill out the form below, and someone from our team will get
                  back to you shortly.
                </p>
                <form onSubmit={handleSubmit}>
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
                        value={user.firstName}
                        placeholder="First Name"
                        required
                      />
                      <label>First Name</label>
                    </div>
                    <div className="wrapper--input">
                      <input
                        type="text"
                        autoComplete="off"
                        value={user.lastName}
                        onChange={handleInputChange}
                        name="lastName"
                        placeholder="Last Name"
                        required
                      />
                      <label>Last Name</label>
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
                        value={user.email}
                        placeholder="mail@example.com"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Email</label>
                    </div>
                    <div className="wrapper--input">
                      <input
                        type="tel"
                        name="contact"
                        value={user.contact}
                        placeholder="(XXX) XXX-XXXX"
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
                      placeholder="Type your comment here..."
                      rows="4"
                      value={user.comment}
                      onChange={handleInputChange}
                    />
                    <label> Comment</label>
                  </div>
                  <div className="send-message-btn">
                    <button type="submit" disabled={loading} style={{ backgroundColor: loading && "167CB9" }}>
                      {
                        loading ? "Sending..." : <span>
                          Send Message <img src={img4} />
                        </span>
                      }

                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="footerrightsection">
                <h2>Contact details</h2>
                <h5>
                  The contact information of Al Bashayera is listed below:
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
                      <img src={img5} style={{ width: "12px" }} />
                    </div>
                    <div className="follow-image">
                      <img src={img6} />
                    </div>
                    <div className="follow-image">
                      <img src={img7} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <OfficeDetails />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Form;
