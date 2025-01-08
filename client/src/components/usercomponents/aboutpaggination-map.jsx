import React, { useState } from "react";
import "../../assets/stylesheets/paggination.scss";
import Slider from "../usercomponents/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="container">
      {/* Render cards */}
      <div className="row">
        {currentItems.map((card, index) => (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2">
            <Slider
              image={card.image}
              text={card.text}
              texts={card.texts}
              title={card.title}
            />
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
