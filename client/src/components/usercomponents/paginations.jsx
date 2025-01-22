import React from "react";
import "../../assets/stylesheets/paggination.scss";
import PaginatedCards from "../usercomponents/paggination-map";
import img1 from "../../assets/images/right-up 1 (2).png";
import { NavLink } from "react-router-dom";

const RecentlyAdded = ({ data }) => {

  return (
    <div className="container">
      <div className="recentlyadd-section">
        <h2>Recently Added</h2>
        <div className="join-auction-btn">
          <NavLink to="/auction-vehicle">
            View All
            <img src={img1} />
          </NavLink>
        </div>
      </div>

      <PaginatedCards data={data} itemsPerPage={4} />
    </div>
  );
};

export default RecentlyAdded;
