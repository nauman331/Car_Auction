import React from "react";
import "../../assets/stylesheets/paggination.scss";
import PaginatedCards from "../usercomponents/paggination-map";
import img from "../../assets/images/Surface 1.png"
import img1 from "../../assets/images/right-up 1 (2).png"

const RecentlyAdded = () => {
  const data = [
    {
      id: 1,
      title: "Mercedes-Benz, C Class",

      image: img,
      price: "$399",
    },
    {
      id: 2,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 3,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 4,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 5,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 6,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 7,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 8,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 9,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 10,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 11,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
    {
      id: 12,
      title: "Mercedes-Benz, C Class",
      image: img,
      price: "$399",
    },
  ];

  return (
    <div className="container-xl">
      <div className="recentlyadd-section">
        <h2>Recently Added</h2>
        <div className="join-auction-btn">
          <a href="#">
            View All
            <img src={img1} />
          </a>
        </div>
      </div>

      <PaginatedCards data={data} itemsPerPage={4} />
    </div>
  );
};

export default RecentlyAdded;
