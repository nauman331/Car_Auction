import React, { useState } from "react";
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

const CarAuction = ({ car, getCarDetails }) => {
  const { socket } = useSelector((state) => state.socket);
  const { token } = useSelector((state) => state.auth);
  const { currentBidData } = useSelector((state) => state.event);
  const [bid, setBid] = useState(car.startingBid || 0);

  const handleBidChange = (change) => setBid(prevBid => Math.max(car.startingBid, prevBid + change));

  const handleAction = (action) => {
    if (socket && token && car._id) {
      const data = { carId: car._id, token, bidAmount: parseFloat(bid) };
      if (action === "start" || (action === "place" && bid > currentBidData?.bidAmount)) {
        socket.emit(action === "start" ? "openAuction" : "placeBid", data);
        getCarDetails();
        setBid(action === "place" ? currentBidData?.bidAmount : bid);
      } else {
        toast.error("Bid amount should be greater than the current bid");
      }
    }
  };

  return (
    <div className="car-auction">
      <h1>{car.listingTitle || "No Title"}</h1>
      <p className="lot-info">Lot No. {car.lotNo}</p>
      <p className="car-details">
        {car.mileage || "No Mileage"} kms <span className="dots"></span>{car.fuelType?.vehicleFuelTypes || "No Fuel Type"} <span className="dots"></span>{car.transmission?.vehicleTransimission || "No Transmission"}
      </p>

      <div className="current-bid">
        {car.sellingType === "auction" ? (
          <>
            <p>Current Bid</p>
            <h2>AED {currentBidData?.carId === car._id ? currentBidData?.bidAmount : car.startingBid}</h2>
            <p>Bid Starting Price: {car.startingBid || "N/A"} AED</p>
          </>
        ) : (
          <>
            <p>Discounted Price</p>
            <h2>AED {car.discountedPrice || car.price || "N/A"}</h2>
            {car.discountedPrice && <p>Original Price: {car.price} AED</p>}
          </>
        )}
      </div>

      <div className="bid-controls">
        {car.sellingType === "auction" ? (
          car.auctionStatus ? (
            <>
              <button onClick={() => handleBidChange(-car.bidMargin)}>-</button>
              <span>AED <input type="number" value={bid} onChange={(e) => setBid(parseFloat(e.target.value))} /></span>
              <button onClick={() => handleBidChange(car.bidMargin)}>+</button>
              <button className="place-bid" onClick={() => handleAction("place")}>
                <img src={img1} alt="Place Bid" />
                Place Bid
              </button>
            </>
          ) : (
            <button className="place-bid" onClick={() => handleAction("start")}>
              <img src={img1} alt="Start Bidding" />
              Start Bidding
            </button>
          )
        ) : (
          <button className="place-bid" style={{ backgroundColor: car.isSold ? "#4682B4" : "" }}>
            <img src={img1} alt="Mark as Sold" />
            {car.isSold ? "Sold" : "Mark as Sold"}
          </button>
        )}
      </div>

      <div className="car-overview">
        <h3>Car Overview</h3>
        <ul>
          {[
            { label: "Body", value: car.carMake?.vehicleMake || "No Vehicle Make", img: img2 },
            { label: "Mileage", value: `${car.mileage || "No Mileage"}000 miles`, img: img3 },
            { label: "Fuel Type", value: car.fuelType?.vehicleFuelTypes || "No Fuel Type", img: img4 },
            { label: "Year", value: car.year?.vehicleYear || "N/A", img: img5 },
            { label: "Transmission", value: car.transmission?.vehicleTransimission || "No Transmission", img: img6 },
            { label: "Drive Type", value: car.driveType?.driveType, img: img7 },
            { label: "Condition", value: car.carType?.vehicleType || "No Car Type", img: img8 },
            { label: "Engine Size", value: car.engineSize?.vehicleEngineSize || "No Engine Size", img: img9 },
            { label: "Doors", value: car.noOfDoors?.vehicleDoor || "No Doors", img: img10 },
            { label: "Cylinders", value: car.cylinders?.vehicleCylinders || "N/A", img: img11 },
            { label: "Color", value: car.color?.vehicleColors || "No Color", img: img12 },
            { label: "VIN", value: car.vin || "No Vin", img: img13 },
          ].map(({ label, value, img }, idx) => (
            <li key={idx}>
              <div className="texts">
                <span className="icon"><img src={img} alt={label} /></span>
                <p className="label">{label}</p>
              </div>
              <p className="value">{value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="location">
        <h2>Location</h2>
        <p>{car.friendlyLocation || car.mapLocation || "No Location"}</p>
      </div>
    </div>
  );
};

export default CarAuction;
