import React from "react";
import "../../assets/stylesheets/paggination.scss";
import PaginatedCards from "../usercomponents/related-listing-map";
import img1 from "../../assets/images/Surface 1.png";
import img2 from "../../assets/images/right-up 1 (2).png";
const Relatedlistening = () => {
  const data = [
    {
      id: 1,
      title: "Mercedes-Benz, C Class",
      image: img1,
      lowmilage: "Low Mileage",
      delete: "$789",
      price: "$399",
    },
    {
      id: 2,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
    {
      id: 3,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
      greatprice: "Great Price",
    },
    {
      id: 4,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
    {
      id: 5,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
    {
      id: 6,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
    {
      id: 7,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
    {
      id: 8,
      title: "Mercedes-Benz, C Class",
      image: img1,
      delete: "$789",
      price: "$399",
    },
  ];
  return (
    <div className="relatedlistening-section">
      <div className="recentlyadd-section">
        <h2>Related Listings</h2>
        <div className="join-auction-btn">
          <a href="#">
            View All
            <img src={img2} />
          </a>
        </div>
      </div>
      <div className="mb-5">
        <PaginatedCards data={data} itemsPerPage={4} />
      </div>
    </div>
  );
};

export default Relatedlistening;
