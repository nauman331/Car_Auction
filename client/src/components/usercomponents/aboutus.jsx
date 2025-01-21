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
                      Lorem ipsum dolor sit amet consectetur. Convallis integer
                      enim eget sit urna. Eu duis lectus amet vestibulum varius.
                      Nibh tellus sit sit at lorem facilisis. Nunc vulputate ac
                      interdum aliquet vestibulum in tellus.
                    </p>
                    <p>
                      Sit convallis rhoncus dolor purus amet orci urna. Lobortis
                      vulputate vestibulum consectetur donec ipsum egestas velit
                      laoreet justo. Eu dignissim egestas egestas ipsum. Sit est
                      nunc pellentesque at a aliquam ultrices consequat. Velit
                      duis velit nec amet eget eu morbi. Libero non diam sit
                      viverra dignissim. Aliquam tincidunt in cursus euismod eni
                    </p>
                    <p>
                      Magna odio sed ornare ultrices. Id lectus mi amet sit at
                      sit arcu mi nisl. Mauris egestas arcu mauris.
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
