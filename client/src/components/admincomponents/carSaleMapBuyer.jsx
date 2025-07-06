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
import Logo from "../../assets/images/Logo.svg";
import { CirclePlay, HeartPulse, Shield, Award } from "lucide-react";

const CarAuction = ({ car }) => {
  return (
    <div className="car-auction" style={{ marginTop: "0px" }}>
      {/* Professional Header with Branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #f0f0f0",
          marginTop: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <img
            src={Logo}
            alt="Company Logo"
            style={{
              height: "24px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#333",
                lineHeight: "1.2",
              }}
            >
              Premium Auto Auction
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Shield size={8} />
              Certified & Verified
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.2rem",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              color: "#888",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Award size={8} />
            Lot #{car?.lotNo}
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              color: "#999",
              fontStyle: "italic",
            }}
          >
            Est. {new Date().getFullYear()} • UAE
          </div>
        </div>
      </div>

      <div
        className="car-overview"
        style={{ marginTop: "0.1rem", padding: "0 2rem" }}
      >
        <ul>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img2}
                  alt="Make icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Make
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.carMake?.vehicleMake || "No Vehicle Make"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <HeartPulse size={14} />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Damage
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.damage?.vehicleDamage || "No Vehicle Damage"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <CirclePlay size={14} />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Start Code
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.startCode || "No Start Code"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img3}
                  alt="Mileage icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Mileage
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.mileage || "No Mileage"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img4}
                  alt="Fuel type icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Fuel Type
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img5}
                  alt="Year icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Year
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.year?.vehicleYear || "No Year"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img6}
                  alt="Transmission icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Transmission
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.transmission?.vehicleTransimission || "No Transmission"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img7}
                  alt="Drive type icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Drive Type
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.driveType?.driveType || "No Drive Type"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img8}
                  alt="Car type icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Car Type
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.carType?.vehicleType || "No Car Type"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img9}
                  alt="Engine size icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Engine Size
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.engineSize?.vehicleEngineSize || "No Engine Size"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img10}
                  alt="Doors icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Doors
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.noOfDoors?.vehicleDoor || "No Doors"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img11}
                  alt="Cylinders icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Cylinders
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.cylinders?.vehicleCylinders || "No Cylinders"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img12}
                  alt="Color icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                Color
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.color || "No Color"}
            </p>
          </li>
          <li>
            <div className="texts">
              <span className="icon">
                <img
                  src={img7}
                  alt="VIN icon"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <p className="label" style={{ fontSize: "0.75rem" }}>
                VIN
              </p>
            </div>
            <p className="value" style={{ fontSize: "0.75rem" }}>
              {car.vin || "No VIN"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarAuction;
