import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRange = 2
}) => {
  const visiblePages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - pageRange && i <= currentPage + pageRange)
    ) {
      visiblePages.push(i);
    } else if (
      (i === currentPage - pageRange - 1 ||
        i === currentPage + pageRange + 1) &&
      !visiblePages.includes("...")
    ) {
      visiblePages.push("...");
    }
  }

  return (
    <div className="pagination">
      <button
        className="circle-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>
      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`circle-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="circle-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
