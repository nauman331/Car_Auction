import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trash,
  PencilLine,
  Search,
} from "lucide-react";
import { deleteAuction } from "../../store/slices/categorySlice";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";

const AuctionListings = () => {
  const dispatch = useDispatch();
  const { auctions } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  const deletCar = async (id) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/auction/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(deleteAuction(id));
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDisplayedAuctions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return auctions.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPagination = () => {
    const visiblePages = [];
    const pageRange = 2;

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
          onClick={() => handlePageChange(currentPage - 1)}
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
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="circle-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Auction Events</h3>
          <small>Auction events management</small>
        </span>
        <NavLink to="/admin/addauctionevent" className="add-vehicle-button">
          Add New Auction ↗
        </NavLink>
      </div>
      <div className="car-list-container">
        <header className="car-list-header">
          <div className="car-list-header-input">
            <Search />
            <input type="text" placeholder="Search Cars e.g., Audi Q7" />
          </div>
          <div className="sort-options">
            <span>Auction:</span>
            <select>
              <option value="all">All</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Total Vehicles</th>
                <th>Date</th>
                <th>Status</th>
                <th>Auction</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedAuctions().map((auction, index) => (
                <tr key={index}>
                  <td>
                    <div className="car-info">
                      <p>{auction.auctionTitle}</p>
                    </div>
                  </td>
                  <td>{auction.totalVehicles}</td>
                  <td>
                    {new Date(auction.auctionDate).toLocaleDateString()}
                    <br />
                    <small>{auction.auctionTime}</small>
                  </td>
                  <td>{auction.statusText}</td>
                  <td className="action-buttons">
                    <button onClick={() => deletCar(auction._id)}>
                      <Trash size={16} />
                    </button>
                    <button>
                      <PencilLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>
    </>
  );
};

export default AuctionListings;
