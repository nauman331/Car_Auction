import React from "react";
import "../../assets/stylesheets/aboutus.scss";
import img1 from "../../assets/images/images.png";
import Feature from "../usercomponents/aboutfeature";
// import Premium from "../usercomponents/premium";
// import TeamSection from "../usercomponents/team";
import "../../assets/stylesheets/FeatureCategory.scss";
import Aboutpaggination from "../usercomponents/aboutpaginations";
// import FAQs from "../usercomponents/faq";
import { Link } from "react-router-dom";
const Aboutus = () => {
  return (
    <div>
      <div style={{ paddingBottom: 40, backgroundColor: "#050b20" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {/* <a href="home.js">Home</a> */}
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>
          </div>
          <div className="aboutus-section mb-5">
            <div className="about-text">
              <h1>About Us</h1>
            </div>
            <div className="about-section2">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                  <div className="about-section2-text">
                    <h2>
                      We Value Our Clients And Want Them To Have A Nice
                      Experience
                    </h2>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                  <div className="about-section2-detail">
                    <p>
                      Welcome to Al Bashayera, where we make buying and selling
                      vehicles simple and enjoyable.
                    </p>
                    <p>
                      We are dedicated to delivering a seamless auction
                      experience with a focus on transparency, efficiency, and
                      client satisfaction. Whether you’re here to bid on your
                      dream car or sell your vehicle, we’re here to assist every
                      step of the way.
                    </p>
                    <p>
                      Explore a diverse range of vehicles, trust our
                      professional team, and enjoy a smooth auction process
                      designed with you in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-section-images ">
            <div className="row">
              <div className="col-lg-6">
                <div className="row gap-3">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <img
                          src={img1}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <img
                          src={img1}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <img
                      src={img1}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row gap-3">
                  <div className="col-lg-12">
                    <img
                      src={img1}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <img
                          src={img1}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <img
                          src={img1}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Feature />
          </div>
          {/* <div>
            <Premium />
          </div> */}
          {/* <div>
            <TeamSection />
          </div> */}

          {/* <div>
            <FAQs />
          </div> */}
        </div>
        <div>
          <Aboutpaggination />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
