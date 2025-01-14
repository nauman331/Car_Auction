import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/body.png";
import "../../assets/stylesheets/eventauction.scss";


const AuctionCard = ({ auctions }) => {
  return (
    <div>
      <div className="d-flex live-car">
        <span className="badge bg-danger">Live</span>
        <span className="live-text" style={{ fontSize: "12px" }}>
          Today's Live Auction
        </span>
      </div>
      <div className="row">
        {auctions.map((auction, index) => (
          <div
            className="col-xl-4 col-lg-4  col-md-6  col-sm-12  col-12 col-12 mb-4"
            key={index}
          >
            <div className="card h-100 text-white ">
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
              </div>
              {/* Auction Title */}
              <div className="card-body">
                {/* Details Section */}
                <div className="d-flex justify-content-between align-items-center mb-3  gap-1 card-text">
                  <span
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    <img src={img1} />
                    {auction.location}
                  </span>
                  <span
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    <img src={img2} />
                    No of Cars {auction.cars}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm w-20 "
                    style={{ fontSize: "12px" }}
                  >
                    View All
                  </button>
                </div>
                {/* Join Auction Button */}
                <button
                  className="btn btn-success w-100 fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  Join Auction
                </button>
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
  // {
  //   title: "Luxury Car Auction",
  //   day: "Wednesday",
  //   date: "Jan 15, 2025",
  //   time: "1:00 PM",
  //   location: "Abu Dhabi - Marina Mall",
  //   cars: 40,
  // },
];

const Liveevents = () => {
  return (
    <div>
      <AuctionCard auctions={auctions} />
    </div>
  );
};

export default Liveevents;
