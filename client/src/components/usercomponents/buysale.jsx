import React from "react";
import "../../assets/stylesheets/carsale.scss";
import CarAuction from "../usercomponents/buysale-map";
import FeatureCategory from "../usercomponents/featurescatageories";
import Relatedlistening from "../usercomponents/related-listening";
import "../../assets/stylesheets/FeatureCategory.scss";
import img1 from "../../assets/images/image103.png";
import img6 from "../../assets/images/playbutton.png";
import img3 from "../../assets/images/camera 1.png";
import img4 from "../../assets/images/report 1.png";
import img5 from "../../assets/images/Car Brochure.png";

function Buysale() {
  const featuresData = [
    {
      category: "Interior",

      features: [
        "Air Conditioner",
        "Digital Odometer",
        "Leather Seats",
        "Heater",
        "Tachometer",
      ],
    },
    {
      category: "Exterior",
      features: [
        "Fog Lights Front",
        "Rain Sensing Wipe",
        "Rear Spoiler",
        "Sun Roof",
      ],
    },
    {
      category: "Safety",
      features: [
        "Brake Assist",
        "Child Safety Locks",
        "Traction Control",
        "Power Door Locks",
        "Driver Air Bag",
      ],
    },
    {
      category: "Comfort & Convenience",
      features: ["Power Steering", "Vanity Mirror", "Trunk Light"],
    },
  ];
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
                  Cars for Sale
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  col-12 col-12 mb-4">
              <div className="carsale-section">
                <img src={img1} alt="image103" />
                <div className="carsale-btns1">
                  <button>
                    <img src={img6} />

                    <span>Video</span>
                  </button>
                </div>
                <div className="carsale-btns2">
                  <button>
                    <img src={img3} />

                    <p>All Photos</p>
                  </button>
                </div>
              </div>
              <div className="car-description">
                <h2>Description</h2>
                <p>
                  Quisque imperdiet dignissim enim dictum finibus. Sed
                  consectetutr convallis enim eget laoreet. Aenean vitae nisl
                  mollis, porta risus vel, dapibus lectus. Etiam ac suscipit
                  eros, eget maximus
                </p>
                <p>
                  Etiam sit amet ex pharetra, venenatis ante vehicula, gravida
                  sapien. Fusce eleifend vulputate nibh, non cursus augue
                  placerat pellentesque. Sed venenatis risus nec felis mollis,
                  in pharetra urna euismod. Morbi aliquam ut turpis sit amet
                  ultrices. Vestibulum mattis blandit nisl, et tristique elit
                  scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut
                  rutrum risus et nunc pretium scelerisque.
                </p>
                <div className="view-btn-section">
                  <div className="view-btns">
                    <button>
                      <img src={img4} />
                      View Vin Report
                    </button>
                  </div>
                  <div className="Car-Brochure-btns">
                    <button>
                      <img src={img5} />
                      Car Brochure
                    </button>
                  </div>
                </div>
              </div>
              <div className="features-sections">
                <h2>Features</h2>
                <div className="features-details">
                  {featuresData.map((data, index) => (
                    <FeatureCategory
                      key={index}
                      title={data.category}
                      features={data.features}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  col-12 col-12 mb-4 px-2">
              <CarAuction />
            </div>
          </div>
          <div className="row">
            <Relatedlistening />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buysale;
