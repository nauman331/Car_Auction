import React, { useState } from "react";
import "../../assets/stylesheets/paggination.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../../assets/images/save.png";
import img2 from "../../assets/images/right-up 1 (1).png";

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
            key={item.id}
            className="  col-xl-3 col-lg-3  col-md-3  col-sm-6  col-12 col-12 p-2"
          >
            <div className="catagory">
              {/* Image Section */}
              <div className="image-section">
                <img src={item.image} alt={item.title} />
                <div className="icon-overlay">
                  <img src={img1} alt="save" />
                </div>
              </div>

              {/* Content Section */}
              <div className="Content-Section">
                <h4>{item.title}</h4>
                <span className="details">
                  26,786 kms <span>• Petrol</span>
                  <span>• Automatic</span>
                </span>
                <p className="price">{item.price}</p>
                <div className="join-auction-btn">
                  <a href="#">
                    View Details
                    <img src={img2} />
                  </a>
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
