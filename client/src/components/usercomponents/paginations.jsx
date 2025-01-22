import React from "react";
import "../../assets/stylesheets/paggination.scss";
import PaginatedCards from "../usercomponents/paggination-map";
import img1 from "../../assets/images/right-up 1 (2).png";
import { NavLink } from "react-router-dom";

const RecentlyAdded = ({data}) => {

  const latestCars = data
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)) // Sort by newest first
    .slice(0, 12); // Limit to the latest 12 cars

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

      <PaginatedCards data={latestCars} itemsPerPage={4} />
    </div>
  );
};

export default RecentlyAdded;
