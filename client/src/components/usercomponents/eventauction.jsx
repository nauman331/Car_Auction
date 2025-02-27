import React from "react";
import Liveevents from "../usercomponents/liveevents";
import Upcomingevents from "./upcomingevents";
import { Link } from "react-router-dom";

const Eventauction = () => {
  return (
    <>
      <div style={{ paddingBottom: 40, backgroundColor: "#405FF2" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {/* <a href="home.js">Home</a> */}
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Auction Events
                </li>
              </ol>
            </nav>
          </div>
          <div className="Auction-Vehicles-text">
            <h1> Auction Events</h1>
          </div>
          <Liveevents />
          <Upcomingevents />
        </div>
      </div>
    </>
  );
};

export default Eventauction;
