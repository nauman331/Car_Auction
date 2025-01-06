import React from "react";
import "../../assets/stylesheets/carddata.scss";
import img2 from "../../assets/images/speedometer 1.png";
import img3 from "../../assets/images/gasoline-pump 1.png";
import img4 from "../../assets/images/gearbox 1.png";
import img5 from "../../assets/images/right-up 1 (1).png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Cardsing = ({ data }) => {
  const { currentBidData } = useSelector(state => state.event);
  return (
    <div>
      <div className="row">
        {data.map((item) => (
          !item.isSold &&
          <div
            key={item._id}
            className="col-xl-3 col-lg-3  col-md-4  col-sm-6  col-12 col-12 mb-4 px-2"
          >
            <div className="catagorys-section">
              {/* Image Section */}
              <div className="images-section">
                <img src={item.carImages[0]} alt={item.listingTitle || "No Title"} />
              </div>

              {/* Content Section */}
              <div className="Contents-Section">
                <h4>{item.listingTitle}</h4>
                <p className="address">{item.description?.length > 40 ? item.description?.substring(0, 40).trimEnd() + '...' : item.description || "No Description"}</p>
                <span className="detailsdata">
                  <ul>
                    <li>
                      <img src={img2} />
                      <h5> {item.mileage || "N/A"} kms</h5>
                    </li>
                    <li>
                      <img src={img3} />
                      <h5>{item.fuelType?.vehicleFuelTypes || "N/A"}</h5>
                    </li>
                    <li>
                      <img src={img4} />
                      <h5>{item.transmission?.vehicleTransimission || "N/A"}</h5>
                    </li>
                  </ul>
                </span>
                <div className="view-detail-section">
                { item.sellingType === "auction" ? <p className="price">AED
                   {item._id === currentBidData?.carId && currentBidData?.currentBid || item.startingBid || "N/A"}
                   </p> :  <p className="price">AED {item.discountedPrice || item.price || "N/A"}</p>}
                  <div className="viewdetail-btn">
                    {
                      item.sellingType === "auction" ?
                      <NavLink to={`/auctioncar/${item._id}`}>
                      View Details
                      <img src={img5} alt="right-up" />
                    </NavLink>
                    :
                    <NavLink to={`/buycar/${item._id}`}>
                      View Details
                      <img src={img5} alt="right-up" />
                    </NavLink>
                    }
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
