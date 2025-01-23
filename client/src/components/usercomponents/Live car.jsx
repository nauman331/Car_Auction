import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/livecar.scss";
import img1 from "../../assets/images/autoliveauction.jpg";
import img2 from "../../assets/images/right-up 1.png";
import { NavLink } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
function Livecar() {
  const [currentCar, setCurrentCar] = useState();

  const getCurrentCar = async () => {
    try {
      const response = await fetch(`${backendURL}/auction/active-car`, {
        method: "GET",
      });
      const res_data = await response.json(); // Wait for JSON data
      if (response.ok) {
        setCurrentCar(res_data);
      } else {
        console.log(res_data.message || "Failed to fetch the current car.");
      }
    } catch (error) {
      console.log("Error in getting the current car:", error);
    }
  };

  useEffect(() => {
    getCurrentCar();
  }, []);
  return (
    <section className="Live-car-section">
      <div className="live-car-title">
        <div className="Live-car-image">
          <img src={img1} />
        </div>

        <div className="live-car-bg">
          <div className="Live-car-text">
            <h2>
              Join Live Car Auctions <br></br>Anytime, Anywhere
            </h2>
            <p>
              Our live car auctions are available online, allowing you to
              participate from the comfort of your home or wherever you are.
              With real-time bidding and seamless access, you’ll never have to
              miss out on the chance to secure your dream car, no matter where
              you are.
            </p>
            <div className="btn">
              <NavLink
                className="nav-link"
                to={
                  currentCar && currentCar._id
                    ? `/auctioncar/${currentCar._id}`
                    : "/auction-vehicle"
                }
              >
                Join Auction <img src={img2} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Livecar;
