import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/body.png";
import "../../assets/stylesheets/eventauction.scss";
import { backendURL } from "../../utils/Exports";

const AuctionCard = () => {

  const [auctions, setAuctions] = useState([])

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      console.log(res_data)
      if (response.ok) {
        setAuctions(res_data)

      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    }
  };

  useEffect(() => {
    getAllAuctions();
  }, []);


  const calculateTimeLeft = (date, time) => {
    const auctionDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const difference = auctionDateTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timers, setTimers] = useState(
    auctions.map((auction) => calculateTimeLeft(new Date(auction.auctionDate).toLocaleDateString(), auction.auctionTime))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(
        auctions.map((auction) => calculateTimeLeft(new Date(auction.auctionDate).toLocaleDateString(), auction.auctionTime))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  return (
    <div>
      <div className="d-flex live-car">
        <span className="live-text" style={{ fontSize: "12px" }}>
          UpComing Live Auction
        </span>
      </div>
      <div className="row">
        {auctions.map((auction, index) => (
          auction.statusText === "Pending" &&
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
            key={index}
          >
            <div className="card h-100 text-white">
              {/* Header Section */}
              <div className="abs">
                <h5 className="card-title mb-2">
                  {auction.auctionTitle || "N/A"}
                </h5>
                {/* Date and Time */}
                <p className="texts mb-3" style={{ fontSize: "14px" }}>
                  {new Date(auction.auctionDate).toLocaleDateString()} at {auction.auctionTime || "N/A"}
                </p>
                {/* Countdown Timer */}
                <div className="countdown text-center d-flex justify-content-between gap-3">
                  {timers[index] ? (
                    <>
                      <div className="text-center">
                        <span className="d-block fw-bold">
                          {timers[index].days}
                        </span>
                        <span style={{ fontSize: "12px" }}>Days</span>
                      </div>
                      <div className="text-center">
                        <span className="d-block fw-bold">
                          {timers[index].hours}
                        </span>
                        <span style={{ fontSize: "12px" }}>Hours</span>
                      </div>
                      <div className="text-center">
                        <span className="d-block fw-bold">
                          {timers[index].minutes}
                        </span>
                        <span style={{ fontSize: "12px" }}>Min</span>
                      </div>
                      <div className="text-center">
                        <span className="d-block fw-bold">
                          {timers[index].seconds}
                        </span>
                        <span style={{ fontSize: "12px" }}>Sec</span>
                      </div>
                    </>
                  ) : (
                    <span>Started</span>
                  )}
                </div>
              </div>
              {/* Auction Details */}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3 gap-1 card-text">
                  <span
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    <img src={img1} alt="Location" />
                    {auction.location?.auctionLocation || "N/A"}
                  </span>
                  <span
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    <img src={img2} alt="Cars" />
                    No of Cars {auction.totalVehicles || 0}
                  </span>
                  <span>Auction No: {auction.auctionNumber || ""}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Upcomingevents = () => {
  return <AuctionCard />;
};

export default Upcomingevents;
