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
import { Modal, Button } from "react-bootstrap";
import { CirclePlay, HeartPulse } from "lucide-react";


const BuyCar = ({ car, purchaseCar, buyLoading }) => {

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  

  const handleBuyNowClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    purchaseCar();
    setShowConfirmModal(false)
  };

  const handleCancelPurchase = () => {
    setShowConfirmModal(false); // Close modal
  };

  return (
    <>
      <div className="car-auction">
        <h1>{car.listingTitle || "No Title"} <span className="action-buttons"></span></h1>
        <p className="lot-info">Car Model {car.carModal || "No Model"}</p>
        <p className="car-details">
          {car.mileage || "No Mileage"} kms <p className="dots"></p>{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
          <p className="dots"></p> {car.transmission?.vehicleTransimission || "No Transmission"}
        </p>
        <div className="current-bid">
          <p>Discounted Price</p>
          <h2>AED {car.discountedPrice ? car.discountedPrice : car.price || "N/A"}</h2>
          {car.discountedPrice && <p>Original Price: {car.price || "N/A"} AED</p>}
        </div>

        <div className="bid-controls">
          {
            !car.isSold ? 
          <button className="place-bid" onClick={handleBuyNowClick}>
            <img src={img1} />
            Buy Now
          </button>
          : 
          <h4 style={{ color: "#aaa", margin: "1rem 0" }}>Car is already Sold</h4>
          }
        </div>

        <div className="car-overview">
          <h3>Car Overview</h3>
          <ul>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img2} />
                </span>
                <p class="label">Body</p>
              </div>
              <p class="value">{car.carMake?.vehicleMake || "No Vehicle Make"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                <HeartPulse size={20} />
                </span>
                <p class="label">Damage</p>
              </div>
              <p class="value">{car.damage?.vehicleDamage || "No Vehicle Damage"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                <CirclePlay size={20}/>
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
              <p class="value">{car.mileage || "No Mileage"}Kms</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img4} />
                </span>
                <p class="label">Fuel Type</p>
              </div>
              <p class="value">{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}</p>
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
              <p class="value">{car.transmission?.vehicleTransimission || "No Transmission"}</p>
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
                <p class="label">Condition</p>
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
              <p class="value">{car.engineSize?.vehicleEngineSize || "No Engine Size"}</p>
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
          <p>
            {car.friendlyLocation || car.mapLocation || "No Location"}
          </p>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={handleCancelPurchase} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to buy this car? The amount from your wallet will be cut off.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelPurchase}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmPurchase} disabled={buyLoading}>
            {buyLoading ? "Buying..." : "Buy Car"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default BuyCar;
