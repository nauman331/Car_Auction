import React from "react";
import "../../assets/stylesheets/carddata.scss";

import img1 from "../../assets/images/save.png";
import img2 from "../../assets/images/speedometer 1.png";
import img3 from "../../assets/images/gasoline-pump 1.png";
import img4 from "../../assets/images/gearbox 1.png";
import img5 from "../../assets/images/right-up 1 (1).png";
const Cardsing = ({ data }) => {
  return (
    <div>
      <div className="row">
        {data.map((item) => (
          <div
            key={item.id}
            className="col-xl-3 col-lg-3  col-md-4  col-sm-6  col-12 col-12 mb-4 px-2"
          >
            <div className="catagorys-section">
              {/* Image Section */}
              <div className="images-section">
                <img src={item.image} alt={item.title} />
                <div className="icons-overlay">
                  <img src={img1} alt="save" />
                </div>
                <div className="budget">
                  <a href="#">{item.budget}</a>
                </div>
              </div>

              {/* Content Section */}
              <div className="Contents-Section">
                <h4>{item.title}</h4>
                <p className="address">2023 C300e AMG Line Night Ed Premium</p>
                <span className="detailsdata">
                  <ul>
                    <li>
                      <img src={img2} />
                      <h5> 26,786 kms</h5>
                    </li>
                    <li>
                      <img src={img3} />
                      <h5>Petrol</h5>
                    </li>
                    <li>
                      <img src={img4} />
                      <h5>Automatic</h5>
                    </li>
                  </ul>
                </span>
                <p className="delete">
                  <del>{item.delete}</del>
                </p>
                <div className="view-detail-section">
                  <p className="price">{item.price}</p>
                  <div className="viewdetail-btn">
                    <a href="#">
                      View Details
                      <img src={img5} alt="right-up" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardsing;
