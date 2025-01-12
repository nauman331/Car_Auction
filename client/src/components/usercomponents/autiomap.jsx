import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/sortbydropdown.scss";
import SortByDropdown from "./auto";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img2 from "../../assets/images/speedometer 1.png";
import img3 from "../../assets/images/gasoline-pump 1.png";
import img4 from "../../assets/images/gearbox 1.png";
import img5 from "../../assets/images/right-up 1 (1).png";
import { NavLink } from "react-router-dom";

const itemsPerPage = 12;

const ProductGridWithPagination = ({ cars, sellingType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedAuctionTitle, setSelectedAuctionTitle] = useState("All");

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (auctionTitle) => {
    setSelectedAuctionTitle(auctionTitle);
  };

  useEffect(() => {
    const filtered = cars.filter(
      (car) =>
        (selectedAuctionTitle === "All" ||
          car.auctionLot?.auctionTitle === selectedAuctionTitle) &&
        !car.isSold &&
        car.sellingType === sellingType
    );
    setFilteredCars(filtered);
  }, [cars, selectedAuctionTitle, sellingType]);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="d-flex justify-content-between pb-3 showing">
        <h2 className="showingvehicles">
          Showing {paginatedCars.length} of {filteredCars.length} Vehicles
        </h2>
        <div>
          <SortByDropdown onChange={handleFilterChange} />
        </div>
      </div>

      {paginatedCars?.length > 0 ? (
        <div className="row">
          {paginatedCars.map((item) => (
            <div
              key={item._id}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 px-2"
            >
              <div className="catagorys-section">
                {/* Image Section */}
                <div className="images-section">
                  <img src={item.carImages[0]} alt={item.listingTitle} />
                </div>

                {/* Content Section */}
                <div className="Contents-Section">
                  <h4>{item.listingTitle || "No Title"}</h4>
                  <p className="address">
                    {item.description?.length > 40
                      ? item.description?.substring(0, 40).trimEnd() + "..."
                      : item.description || "No Description"}
                  </p>
                  <span className="detailsdata">
                    <ul>
                      <li>
                        <img src={img2} alt="Mileage" />
                        <h5>{item.mileage || "N/A"} kms</h5>
                      </li>
                      <li>
                        <img src={img3} alt="Fuel Type" />
                        <h5>{item.fuelType?.vehicleFuelTypes || "N/A"}</h5>
                      </li>
                      <li>
                        <img src={img4} alt="Transmission" />
                        <h5>{item.transmission?.vehicleTransimission || "N/A"}</h5>
                      </li>
                    </ul>
                  </span>
                  <div className="view-detail-section">
                    <p className="price">AED {item.price || item.startingBid}</p>

                    <div className="viewdetail-btn">
                      {item.sellingType === "auction" ? (
                        <NavLink to={`/auctioncar/${item._id}`}>
                          View Details
                          <img src={img5} alt="right-up" />
                        </NavLink>
                      ) : (
                        <NavLink to={`/buycar/${item._id}`}>
                          View Details
                          <img src={img5} alt="right-up" />
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center my-5">No Filtered Cars Please Change Filters</h4>
      )}

      {paginatedCars?.length > 0 && (
        <>
          <div style={{ marginTop: "20px", textAlign: "center" }} className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              <ChevronLeft className={`icon ${currentPage === 1 ? "disabled" : ""}`} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                style={{
                  padding: "6px 13px",
                  margin: "0 5px",
                  cursor: "pointer",
                  textAlign: "center",
                  background: currentPage === index + 1 ? "#000" : "transparent",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "50px",
                }}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={handleNext} disabled={currentPage === totalPages}>
              <ChevronRight className={`icon ${currentPage === totalPages ? "disabled" : ""}`} />
            </button>
          </div>
          <div>
            <h2 className="showingvehicles-text">
              Showing Results {paginatedCars.length} - {filteredCars.length} of 1,415
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGridWithPagination;
