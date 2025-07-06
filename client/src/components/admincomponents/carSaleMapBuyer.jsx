import React from "react";
import "../../assets/stylesheets/carsalesinfo.scss";
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
import { CirclePlay, HeartPulse } from "lucide-react";

const CarAuction = ({ car }) => {
  return (
    <div className="car-auction" style={{ marginTop: "0px !important" }}>
      <div className="car-overview">
        <h3>Car Overview</h3>
        <ul>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img2} />
              </span>
              <p className="label">Make</p>
            </div>
            <p className="value">
              {car.carMake?.vehicleMake || "No Vehicle Make"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <HeartPulse size={20} />
              </span>
              <p className="label">Damage</p>
            </div>
            <p className="value">
              {car.damage?.vehicleDamage || "No Vehicle Damage"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <CirclePlay size={20} />
              </span>
              <p className="label">Start Code</p>
            </div>
            <p className="value">{car.startCode || "No Start Code"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img3} />
              </span>
              <p className="label">Mileage</p>
            </div>
            <p className="value">{car.mileage || "No Mileage"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img4} />
              </span>
              <p className="label">Fuel Type</p>
            </div>
            <p className="value">
              {car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img5} />
              </span>
              <p className="label">Year</p>
            </div>
            <p className="value">{car.year?.vehicleYear || "N/A"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img6} />
              </span>
              <p className="label">Transmission</p>
            </div>
            <p className="value">
              {car.transmission?.vehicleTransimission || "No Transmission"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img7} />
              </span>
              <p className="label">Drive Type</p>
            </div>
            <p className="value">{car.driveType?.driveType}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img8} />
              </span>
              <p className="label">Car Type</p>
            </div>
            <p className="value">{car.carType?.vehicleType || "No Car Type"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img9} />
              </span>
              <p className="label">Engine Size</p>
            </div>
            <p className="value">
              {car.engineSize?.vehicleEngineSize || "No Engine Size"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img10} />
              </span>
              <p className="label">Doors</p>
            </div>
            <p className="value">{car.noOfDoors?.vehicleDoor || "No Doors"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img11} />
              </span>
              <p className="label">Cylinders</p>
            </div>
            <p className="value">{car.cylinders?.vehicleCylinders || "N/A"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img12} />
              </span>
              <p className="label">Color</p>
            </div>
            <p className="value">{car.color || "No Color"}</p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img src={img13} />
              </span>
              <p className="label">VIN</p>
            </div>
            <p className="value">{car.vin || "No Vin"}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarAuction;
