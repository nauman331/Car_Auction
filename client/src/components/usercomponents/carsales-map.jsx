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
import { useNavigate } from "react-router-dom";
import { CirclePlay, HeartPulse } from "lucide-react";
import { Video } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import { backendURL } from "../../utils/Exports";

const CarAuction = ({ car, vimeoLive, setVimeoLive }) => {
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  const { token } = useSelector((state) => state.auth);
  const { currentBidData } = useSelector((state) => state.event);
  const [bid, setBid] = useState(car.startingBid || 0);
  const [bidLoading, setBidLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const increaseBid = () => setBid(bid + car.bidMargin);
  const decreaseBid = () => setBid(bid - car.bidMargin);

  const handlePlaceBid = () => {
    if (!token) {
      navigate("/auth");
    }
    if (bidLoading) return; // Prevent duplicate calls
    setBidLoading(true);
    if (socket && token && car?._id) {
      const data = {
        carId: car._id,
        token,
        bidAmount: parseFloat(bid),
      };
      if (
        parseFloat(bid) <=
        parseFloat(
          currentBidData?.bidAmount ||
          currentBidData?.currentBid ||
          car.startingBid
        )
      ) {
        toast.error("Bid amount should be greater than the current bid");
        setBidLoading(false);
        return;
      }
      socket.emit("placeBid", data);
      setBid(currentBidData?.bidAmount || bid);
      setBidLoading(false);
    } else {
      console.log("Socket not connected or invalid data");
      setBidLoading(false);
    }
  };

  const getDeposits = useCallback(async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setCurrentBalance(res_data.currentAmount);
      } else {
        console.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting deposits:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getDeposits();
  }, [getDeposits]);

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
  useEffect(() => {
    setBid(car.startingBid)
  }, [car])

  if (loading) {
    return <LoadingSpinner />;
  }
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
          <h5>Bid Starting Price</h5>
          <h1>
          {car.startingBid || "N/A"} AED
          </h1>
        </div>
        {!car.isSold ? (
          <div className="bid-controls">
            <div className="d-flex gap-2">
              <button onClick={decreaseBid}>-</button>
              <span>
                AED
                <input
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(parseFloat(e.target.value) || 0)}
                />
              </span>
              <button onClick={increaseBid}>+</button>
            </div>
            <div>
              {currentBidData?.auctionStatus &&
                currentBidData?.carId === car._id ? (
                <button
                  className="place-bid"
                  onClick={handlePlaceBid}
                  disabled={bidLoading}
                  style={{ backgroundColor: bidLoading && "gray" }}
                >
                  <img src={img1} />
                  {bidLoading ? "Placing Bid..." : "Place Bid"}
                </button>
              ) : (
                <button
                  className="place-bid"
                  style={{
                    backgroundColor: "grey",
                    cursor: "not-allowed",
                    border: "none",
                  }}
                >
                  <img src={img1} />
                  Place Bid
                </button>
              )}
            </div>
          </div>
        ) : (
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
