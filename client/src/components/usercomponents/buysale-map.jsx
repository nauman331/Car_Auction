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
const CarAuction = () => {
  
  return (
    <div className="car-auction">
      <h1>Volvo XC90</h1>
      <p className="lot-info">Lot No. 1653261</p>
      <p className="car-details">
        28,786 kms <p className="dots"></p>Petrol
        <p className="dots"></p> Automatic
      </p>
      <div className="current-bid">
        <p>Current Bid</p>
        <h2>$5,500</h2>
        <p>Bid Starting Price: $2,500</p>
      </div>

      <div className="bid-controls">
        <button className="place-bid">
          <img src={img1} />
         
          Place Bid
        </button>
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
            <p class="value">SUV</p>
          </li>

          <li>
            <div class="texts">
              <span class="icon">
                <img src={img3} />
                {/* <img src={require("../images/mileage.png")} /> */}
              </span>
              <p class="label">Mileage</p>
            </div>
            <p class="value">28.000 miles</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img4} />
                {/* <img src={require("../images/flue.png")} /> */}
              </span>
              <p class="label">Fuel Type</p>
            </div>
            <p class="value">Petrol</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img5} />
                {/* <img src={require("../images/calendar .png")} /> */}
              </span>
              <p class="label">Year</p>
            </div>
            <p class="value">2023</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img6} />
                {/* <img src={require("../images/gearbox 1 (1).png")} /> */}
              </span>
              <p class="label">Transmission</p>
            </div>
            <p class="value">Automatics</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img7} />
                {/* <img src={require("../images/steering-wheel 1.png")} /> */}
              </span>
              <p class="label">Drive Type</p>
            </div>
            <p class="value">Front Wheel Drive</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img8} />
                {/* <img src={require("../images/condition.png")} /> */}
              </span>
              <p class="label">Condition</p>
            </div>
            <p class="value">Used</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img9} />
                {/* <img src={require("../images/engine.png")} /> */}
              </span>
              <p class="label">Engine Size</p>
            </div>
            <p class="value">4.8L</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img10} />
                {/* <img src={require("../images/door.png")} /> */}
              </span>
              <p class="label">Doors</p>
            </div>
            <p class="value">5-door</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img11} />
                {/* <img src={require("../images/piston 1.png")} /> */}
              </span>
              <p class="label">Cylinders</p>
            </div>
            <p class="value">6</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img12} />
                {/* <img src={require("../images/color.png")} /> */}
              </span>
              <p class="label">Color</p>
            </div>
            <p class="value">Blue</p>
          </li>
          <li>
            <div class="texts">
              <span class="icon">
                <img src={img13} />
                {/* <img src={require("../images/steering-wheel 1.png")} /> */}
              </span>
              <p class="label">VIN</p>
            </div>
            <p class="value">ZN682AVA2P7429564</p>
          </li>
        </ul>
      </div>
      <div className="location">
        <h2>Location</h2>
        <p>
          Ford Shirley, 361 - 369 Stratford Road, Shirley, Solihull, B90 3BS
          Open today 9am - 6pm
        </p>
      </div>
    </div>
  );
};

export default CarAuction;
