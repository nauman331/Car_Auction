import React, { useState, useEffect, useCallback } from "react";
import "../../assets/stylesheets/carsalesinfo.scss";
import img1 from "../../assets/images/placebid.png";
import img2 from "../../assets/images/body.png";
import img3 from "../../assets/images/mileage.png";
import img4 from "../../assets/images/flue.png";
import img5 from "../../assets/images/calendar .png";
import img6 from "../../assets/images/gearbox 1 (1).png";
import img7 from "../../assets/images/steering-wheel 1.png";
import img8 from "../../assets/images/condition.png";
import img9 from "../../assets/images/engine.png";
import img10 from "../../assets/images/door.png";
import img11 from "../../assets/images/piston 1.png";
import img12 from "../../assets/images/color.png";
import img13 from "../../assets/images/steering-wheel 1.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CirclePlay, HeartPulse } from "lucide-react";
import { Video } from "lucide-react";
import { motion } from "framer-motion";

const CarAuction = ({ car, vimeoLive, setVimeoLive }) => {
  const { token } = useSelector((state) => state.auth);
  const { currentBidData } = useSelector((state) => state.event);
  const { currentCarColor } = useSelector((state) => state.color);

  const openLive = () => {
    if (!token) {
      toast.error("Please login first to View Live Event");
      return;
    } else if (currentBalance < 1) {
      toast.error("Live can't be opened due to empty wallet");
    } else {
      setVimeoLive(!vimeoLive);
    }
  };

  return (
    <>
      <div className="car-auction">
        <h1>
          {car.listingTitle || "No Title"}{" "}
          <span className="action-buttons"></span>
        </h1>
        <p className="lot-info">
          Lot: {car.lotNo || "No Lot"} | Model: {car.carModal || "No Model"}
        </p>
        <p className="car-details">
          {car.mileage || "No Mileage"}
          <p className="dots"></p>
          {car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
          <p className="dots"></p>{" "}
          {car.transmission?.vehicleTransimission || "No Transmission"}
        </p>
        <div className="current-bid">
          <h5>Current Bid</h5>
          <h1
            style={{
              backgroundColor:
                currentCarColor?.carId === car._id &&
                currentCarColor.color === "green"
                  ? "#ccffcc"
                  : "#ffcccc",
              textAlign: "center",
              padding: "1rem",
              color:
                currentCarColor?.carId === car._id &&
                currentCarColor.color === "green"
                  ? "#006400"
                  : "#b30000",
              fontSize: "3.5rem",
              width: "70%",
              borderRadius: "10px",
            }}
          >
            AED{" "}
            {currentBidData?.carId === car._id &&
            (currentBidData?.bidAmount || currentBidData?.currentBid)
              ? currentBidData?.bidAmount || currentBidData?.currentBid
              : car?.startingBid}
          </h1>

          <h3
            style={{
              backgroundColor: "#cce5ff",
              color: "#004085",
              textAlign: "center",
              padding: "1rem",
              marginTop: "1rem",
              width: "70%",
              borderRadius: "10px",
            }}
          >
            Bid Placed:{" "}
            {currentBidData?.carId === car._id
              ? currentBidData?.bidhistory?.length > 0
                ? currentBidData.bidhistory[
                    currentBidData.bidhistory.length - 1
                  ]?.bidType
                : currentBidData?.bids?.length > 0
                ? currentBidData.bids[currentBidData.bids.length - 1]
                    ?.bidType || "None"
                : "None"
              : "None"}
          </h3>

          <p className="mt-4">
            Bid Starting Price: {car.startingBid || "N/A"} AED
          </p>
        </div>
        {car.isSold && (
          <h4 style={{ color: "#aaa", margin: "1rem 0" }}>
            Car is already Sold
          </h4>
        )}

        {currentBidData?.auctionStatus && currentBidData?.carId === car._id && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.button
              onClick={openLive}
              style={{
                width: "235px",
                fontSize: "1.1rem",
                marginLeft: "1rem",
                fontWeight: "bold",
                padding: "14px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                borderRadius: "12px",
                backgroundColor: "white",
                color: "#28a745",
                border: "2px solid #28a745",
                boxShadow: "0 4px 10px rgba(40, 167, 69, 0.2)",
                transition: "all 0.3s ease",
              }}
              className="live-event-button"
              whileHover={{
                backgroundColor: "#28a745",
                color: "white",
              }}
            >
              <motion.div whileHover={{ color: "white" }}>
                <Video size={22} strokeWidth={2} />
              </motion.div>
              {vimeoLive ? "Hide " : "View "}
              Live Event
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
                whileHover={{ backgroundColor: "white" }}
              />
            </motion.button>
          </motion.div>
        )}

        <div className="car-overview">
          <h3>Car Overview</h3>
          <ul>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img2} />
                </span>
                <p class="label">Make</p>
              </div>
              <p class="value">
                {car.carMake?.vehicleMake || "No Vehicle Make"}
              </p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <HeartPulse size={20} />
                </span>
                <p class="label">Damage</p>
              </div>
              <p class="value">
                {car.damage?.vehicleDamage || "No Vehicle Damage"}
              </p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <CirclePlay size={20} />
                </span>
                <p class="label">Start Code</p>
              </div>
              <p class="value">{car.startCode || "No Start Code"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img3} />
                </span>
                <p class="label">Mileage</p>
              </div>
              <p class="value">{car.mileage || "No Mileage"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img4} />
                </span>
                <p class="label">Fuel Type</p>
              </div>
              <p class="value">
                {car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
              </p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img5} />
                </span>
                <p class="label">Year</p>
              </div>
              <p class="value">{car.year?.vehicleYear || "N/A"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img6} />
                </span>
                <p class="label">Transmission</p>
              </div>
              <p class="value">
                {car.transmission?.vehicleTransimission || "No Transmission"}
              </p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img7} />
                </span>
                <p class="label">Drive Type</p>
              </div>
              <p class="value">{car.driveType?.driveType}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img8} />
                </span>
                <p class="label">Car Type</p>
              </div>
              <p class="value">{car.carType?.vehicleType || "No Car Type"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img9} />
                </span>
                <p class="label">Engine Size</p>
              </div>
              <p class="value">
                {car.engineSize?.vehicleEngineSize || "No Engine Size"}
              </p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img10} />
                </span>
                <p class="label">Doors</p>
              </div>
              <p class="value">{car.noOfDoors?.vehicleDoor || "No Doors"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img11} />
                </span>
                <p class="label">Cylinders</p>
              </div>
              <p class="value">{car.cylinders?.vehicleCylinders || "N/A"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img12} />
                </span>
                <p class="label">Color</p>
              </div>
              <p class="value">{car.color || "No Color"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img13} />
                </span>
                <p class="label">VIN</p>
              </div>
              <p class="value">{car.vin || "No Vin"}</p>
            </li>
          </ul>
        </div>

        <div className="location">
          <h2>Location</h2>
          <p>{car.friendlyLocation || car.mapLocation || "No Location"}</p>
        </div>
      </div>
    </>
  );
};

export default CarAuction;
