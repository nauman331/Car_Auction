import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/location.png";
import img2 from "../../assets/images/body.png";
import "../../assets/stylesheets/eventauction.scss";
import { backendURL } from "../../utils/Exports";
import { NavLink, useNavigate } from "react-router-dom";

const AuctionCard = () => {
  const navigate = useNavigate();

  const [auctions, setAuctions] = useState([]);
  const [currentCar, setCurrentCar] = useState();

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        setAuctions(res_data);
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    }
  };

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
    getAllAuctions();
    getCurrentCar();
  }, []);

  const handleJoin = () => {
    if (currentCar) {
      navigate(`/auctioncar/${currentCar._id}`);
    } else {
      navigate("/auction-vehicle");
    }
  };

  return (
    <div>
      <div className="d-flex live-car">
        <span className="badge bg-danger">Live</span>
        <span className="live-text" style={{ fontSize: "12px" }}>
          Today's Live Auction
        </span>
      </div>
      <div className="row">
        {auctions.map(
          (auction, index) =>
            auction.statusText === "Ongoing" && (
              <div
                className="col-xl-4 col-lg-4  col-md-6  col-sm-12  col-12 col-12 mb-4"
                key={index}
              >
                <div className="card h-100 text-white ">
                  {/* Header Section */}

                  <div className="abs">
                    <h5 className="card-title mb-2">
                      {auction.auctionTitle || "N/A"}
                    </h5>
                    <span className="badge bg-danger mb-2">Live</span>
                    {/* Date and Time */}
                    <p className="texts mb-3" style={{ fontSize: "14px" }}>
                      {new Date(auction.auctionDate).toLocaleDateString()} at{" "}
                      {auction.auctionTime || "N/A"}
                    </p>
                  </div>
                  {/* Auction Title */}
                  <div className="card-body">
                    {/* Details Section */}
                    <div className="d-flex justify-content-between align-items-center mb-3 gap-1 card-text">
                      <div className="">
                        <span
                          className="d-flex align-items-center"
                          style={{ fontSize: "12px" }}
                        >
                          <img src={img1} />
                          {auction.location?.auctionLocation || "N/A"}
                        </span>
                        <span
                          className="d-flex align-items-center"
                          style={{ fontSize: "12px" }}
                        >
                          <img src={img2} />
                          No of Cars {auction.totalVehicles || 0}
                        </span>
                      </div>
                      <div>
                        <NavLink
                          to="/auction-vehicle"
                          className="btn  btn-sm w-20 text-white"
                          style={{ fontSize: "12px", backgroundColor: "#333" }}
                        >
                          View All
                        </NavLink>
                      </div>
                    </div>
                    {/* Join Auction Button */}

                    <button
                      className="btn btn-success w-100 fw-bold"
                      style={{ fontSize: "14px" }}
                      onClick={handleJoin}
                    >
                      Join Auction
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const Liveevents = () => {
  return (
    <div>
      <AuctionCard />
    </div>
  );
};

export default Liveevents;
