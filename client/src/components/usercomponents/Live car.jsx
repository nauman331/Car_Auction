import React from "react";
import "../../assets/stylesheets/livecar.scss";
import img1 from "../../assets/images/images.png";
import img2 from "../../assets/images/right-up 1.png";
function Livecar() {
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
              <a href="#">
                Join Auction{" "}
                <img src={img2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Livecar;
