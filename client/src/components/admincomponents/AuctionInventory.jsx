import React, { useState } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import {
  ChevronLeft,
  ChevronRight,
  Trash,
  PencilLine,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar } from "../../store/slices/categorySlice";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";

const AuctionInventory = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const deletCar = async (id) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(deleteCar(id));
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

  const getDisplayedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cars.slice(startIndex, startIndex + itemsPerPage);
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
          <h3>My Listings</h3>
          <small>List of vehicles Uploaded fro Buy Now</small>
        </span>
        <NavLink to="/admin/addauction" className="add-vehicle-button">
          Add New Vehicle ↗
        </NavLink>
      </div>
      <div className="car-list-container">
        <header className="car-list-header">
          <div className="car-list-header-input">
            <Search />
            <input type="text" placeholder="Search Cars e.g., Audi Q7" />
          </div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select>
              <option value="newest">Newest</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Lot No.</th>
                <th>Starting Price</th>
                <th>Auction</th>
                <th>Bidding Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedCars().map(
                (car, index) =>
                  car.sellingType === "auction" && (
                    <tr key={index}>
                      <td>
                        <div className="car-info">
                          <div className="car-image">
                            <img
                              src={car.carImages[0]}
                              alt="..."
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="car-name">
                            <p>{car.listingTitle || "No Title"}</p>
                            <p>{car.description || "No Description"}</p>
                            <div className="price">
                              {car.bidMargin && (
                                <p style={{ textDecoration: "none" }}>
                                  Bid Margin: {car.bidMargin}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <small>{car.lotNo || "No Lot No"}</small>
                      </td>
                      <td>
                        <small>{car.startingBid || "No Starting Price"}</small>
                      </td>
                      <td>
                        <small>
                          {car.auctionLot.auctionTitle || "No Auction"}
                        </small>
                      </td>
                      <td>
                        <small>
                          {car.auctionStatus ? "Ongoing" : "Not Started"}
                        </small>
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => deletCar(car._id)}>
                          <Trash size={16} />
                        </button>
                        <button>
                          <PencilLine size={16} />
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>
    </>
  );
};

export default AuctionInventory;
