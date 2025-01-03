import React, { useState } from "react";
import "../../assets/stylesheets/paggination.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img2 from "../../assets/images/right-up 1 (1).png";
import { NavLink } from "react-router-dom";

const PaginatedCards = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Render cards */}
      <div className="row">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="  col-xl-3 col-lg-3  col-md-4  col-sm-6  col-12 col-12 p-2"
          >
            <div className="catagory">
              {/* Image Section */}
              <div className="image-section">
                <img src={item.carImages[0]} alt={item.listingTitle} />
              </div>

              {/* Content Section */}
              <div className="Content-Section">
                <h4>{item.listingTitle || "No Title"}</h4>
                <span className="details">
                  {item.mileage || "N/A"} kms <span>• {item.fuelType?.vehicleFuelTypes || "N/A"}</span>
                  <span>• {item.transmission?.vehicleTransimission || "N/A"}</span>
                </span>
                {
                  item.sellingType === "fixed" ? <p className="price">AED {item.discountedPrice || item.price || "N/A"}</p> :
                    <p className="price">AED {item.startingBid || "N/A"}</p>
                }

                <div className="join-auction-btn">
                  {
                    item.sellingType === "auction" ?

                        <NavLink to={`/auctioncar/${item._id}`}>
                          View Details
                          <img src={img2} />
                        </NavLink>
                      :
                        <NavLink to={`/buycar/${item._id}`}>
                          View Details
                          <img src={img2} />
                        </NavLink> 
                  }
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          <ChevronLeft
            className={`icon ${currentPage === 1 ? "disabled" : ""}`}
          />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          <ChevronRight
            className={`icon ${currentPage === totalPages ? "disabled" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PaginatedCards;
