import React, { useEffect, useState } from "react";
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
  const { token } = useSelector(state => state.auth);
  const { currentBidData } = useSelector(state => state.event);
  const [bid, setBid] = useState(car.startingBid || 0);

  const increaseBid = () => setBid(bid + car.bidMargin);
  const decreaseBid = () => {
    if (bid > car.startingBid) setBid(bid - car.bidMargin);
  };

  const handleStartBid = () => {
    if (socket && token && car._id) {
      const data = {
        carId: car._id,
        token,
      };
      socket.emit("openAuction", data);
      getCarDetails();
    } else {
      console.log("Socket not connected or invalid data");
    }
  };

  const handlePlaceBid = () => {
    if (socket && token && car?._id) {
      const data = {
        carId: car._id,
        token,
        bidAmount: parseFloat(bid),
      };
      if (parseFloat(bid) <= parseFloat(currentBidData?.bidAmount || car.startingBid)) {
        toast.error("Bid amount should be greater than the current bid");
        return;
      }
      socket.emit("placeBid", data);
      setBid(currentBidData?.bidAmount)
    } else {
      console.log("Socket not connected or invalid data");
    }
  };

  return (
    <div className="car-auction">
      <h1>{car.listingTitle || "No Title"}</h1>
      <p className="lot-info">Lot No. {car.lotNo}</p>
      <p className="car-details">
        {car.mileage || "No Mileage"} kms <p className="dots"></p>{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
        <p className="dots"></p> {car.transmission?.vehicleTransimission || "No Transmission"}
      </p>
      <div className="current-bid">
        {
          car.sellingType === "auction" ? (
            <>
              <p>Current Bid</p>
              <h2>AED {currentBidData && (car._id === currentBidData.carId) ? (currentBidData?.bidAmount || car.startingBid || "N/A") : <small style={{fontSize: ".8rem", color: "#aaa"}}>Bidding Started on another car or not started yet</small>}</h2>
              <p>Bid Starting Price: {car.startingBid || "N/A"} AED</p>
            </>
          ) : (
            <>
              <p>Discounted Price</p>
              <h2>AED {car.discountedPrice ? car.discountedPrice : car.price || "N/A"}</h2>
              {car.discountedPrice && <p>Original Price: {car.price || "N/A"} AED</p>}
            </>
          )
        }

      </div>
      {car.sellingType === "auction" ?
        car.auctionStatus ?
          (<div className="bid-controls">
            <button onClick={decreaseBid}>-</button>
            <span>AED
              <input type="number" value={bid}
                onChange={(e) => setBid(parseFloat(e.target.value))}
              /></span>
            <button onClick={increaseBid}>+</button>
            <button className="place-bid" onClick={handlePlaceBid}>
              <img src={img1} />
              Place Bid
            </button>
          </div>)
          :
          (<div className="bid-controls">
            <button className="place-bid" onClick={handleStartBid}>
              <img src={img1} />
              Start Bidding
            </button>
          </div>)
        : <div className="bid-controls">
          <button className="place-bid" style={{ backgroundColor: car.isSold && " #4682B4" }}>
            <img src={img1} />
            {
              car.isSold ? "Sold" : "Mark as Sold"
            }
          </button>
        </div>
      }



      <div className="car-overview">
        <h3>Car Overview</h3>
        <ul>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img2} />
                {/* <img src={require("../images/body.png")} /> */}
              </span>
              <p class="label">Body</p>
            </div>
            <p class="value">{car.carMake?.vehicleMake || "No Vehicle Make"}</p>
          </li>

          <li>
            <div class="texts">
              <span class="icon">
                <img src={img3} />
                {/* <img src={require("../images/mileage.png")} /> */}
              </span>
              <p class="label">Mileage</p>
            </div>
            <p class="value">{car.mileage || "No Mileage"}000 miles</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img4} />
                {/* <img src={require("../images/flue.png")} /> */}
              </span>
              <p class="label">Fuel Type</p>
            </div>
            <p class="value">{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img5} />
                {/* <img src={require("../images/calendar .png")} /> */}
              </span>
              <p class="label">Year</p>
            </div>
            <p class="value">{car.year?.vehicleYear || "N/A"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img6} />
                {/* <img src={require("../images/gearbox 1 (1).png")} /> */}
              </span>
              <p class="label">Transmission</p>
            </div>
            <p class="value">{car.transmission?.vehicleTransimission || "No Transmission"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img7} />
                {/* <img src={require("../images/steering-wheel 1.png")} /> */}
              </span>
              <p class="label">Drive Type</p>
            </div>
            <p class="value">{car.driveType?.driveType}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img8} />
                {/* <img src={require("../images/condition.png")} /> */}
              </span>
              <p class="label">Condition</p>
            </div>
            <p class="value">{car.carType?.vehicleType || "No Car Type"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img9} />
                {/* <img src={require("../images/engine.png")} /> */}
              </span>
              <p class="label">Engine Size</p>
            </div>
            <p class="value">{car.engineSize?.vehicleEngineSize || "No Engine Size"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img10} />
                {/* <img src={require("../images/door.png")} /> */}
              </span>
              <p class="label">Doors</p>
            </div>
            <p class="value">{car.noOfDoors?.vehicleDoor || "No Doors"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img11} />
                {/* <img src={require("../images/piston 1.png")} /> */}
              </span>
              <p class="label">Cylinders</p>
            </div>
            <p class="value">{car.cylinders?.vehicleCylinders || "N/A"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img12} />
                {/* <img src={require("../images/color.png")} /> */}
              </span>
              <p class="label">Color</p>
            </div>
            <p class="value">{car.color?.vehicleColors || "No Color"}</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img13} />
                {/* <img src={require("../images/steering-wheel 1.png")} /> */}
              </span>
              <p class="label">VIN</p>
            </div>
            <p class="value">{car.vin || "No Vin"}</p>
          </li>
        </ul>
      </div>

      <div className="location">
        <h2>Location</h2>
        <p>
          {car.friendlyLocation || car.mapLocation || "No Location"}
        </p>
      </div>
    </div>
  );
};


export default CarAuction;
