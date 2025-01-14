import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/body.png";
import "../../assets/stylesheets/eventauction.scss";

const AuctionCard = ({ auctions }) => {
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
    auctions.map((auction) => calculateTimeLeft(auction.date, auction.time))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(
        auctions.map((auction) => calculateTimeLeft(auction.date, auction.time))
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
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
            key={index}
          >
            <div className="card h-100 text-white">
              {/* Header Section */}
              <div className="abs">
                <h5 className="card-title mb-2">
                  {auction.title} ({auction.day})
                </h5>
                <span className="badge bg-danger mb-2">Live</span>
                {/* Date and Time */}
                <p className="texts mb-3" style={{ fontSize: "14px" }}>
                  {auction.date} at {auction.time}
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
                    {auction.location}
                  </span>
                  <span
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    <img src={img2} alt="Cars" />
                    No of Cars {auction.cars}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm w-20"
                    style={{ fontSize: "12px" }}
                  >
                    View All
                  </button>
                </div>
                {/* <button
                  className="btn btn-success w-100 fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  Join Auction
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example Usage
const auctions = [
  {
    title: "Onsite & Online Auction",
    day: "Sunday",
    date: "Jan 12, 2025",
    time: "10:00 AM",
    location: "ACA - Al Sajaa",
    cars: 136,
  },
  {
    title: "Exclusive Online Auction",
    day: "Monday",
    date: "Jan 13, 2025",
    time: "2:00 PM",
    location: "Dubai - Auction House",
    cars: 50,
  },
  {
    title: "Classic Car Auction",
    day: "Tuesday",
    date: "Jan 14, 2025",
    time: "5:00 PM",
    location: "Sharjah - Al Wahda",
    cars: 72,
  },
];

const Upcomingevents = () => {
  return <AuctionCard auctions={auctions} />;
};

export default Upcomingevents;
