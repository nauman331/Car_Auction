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
        {data.filter(item => !item.isSold && !(item.sellingType === "auction" && (item.auctionLot == null || item.auctionLot?.statusText === "Compeleted"))).map((item) => (
          <div key={item._id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-4 px-2">
            <div className="catagorys-section">
              {/* Image Section */}
              <div className="images-section">
                <img
                  src={item.carImages?.[0] || "/path/to/fallback/image.png"}
                  alt={item.listingTitle || "No Title"}
                />
              </div>

              {/* Content Section */}
              <div className="Contents-Section">
                <h4>{item.listingTitle || "No Title"}</h4>
                <p className="address">
                  {item.description?.length > 40 ? `${item.description.substring(0, 40).trim()}...` : item.description || "No Description"}
                </p>

                <span className="detailsdata">
                  <ul>
                    <li>
                      <img src={img2} alt="mileage" />
                      <h5>{item.mileage || "N/A"} miles</h5>
                    </li>
                    <li>
                      <img src={img3} alt="fuel" />
                      <h5>{item.fuelType?.vehicleFuelTypes || "N/A"}</h5>
                    </li>
                    <li>
                      <img src={img4} alt="transmission" />
                      <h5>{item.transmission?.vehicleTransimission || "N/A"}</h5>
                    </li>
                  </ul>
                </span>

                {/* View Detail Section */}
                <div className="view-detail-section">
                  <p className="price">
                    AED {item.sellingType === "auction"
                      ? (item._id === currentBidData?.carId ? currentBidData?.currentBid : item.startingBid) || "N/A"
                      : item.discountedPrice || item.price || "N/A"}
                  </p>

                  <div className="viewdetail-btn">
                    <NavLink to={item.sellingType === "auction" ? `/auctioncar/${item._id}` : `/buycar/${item._id}`}>
                      View Details
                      <img src={img5} alt="right-up" />
                    </NavLink>
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
