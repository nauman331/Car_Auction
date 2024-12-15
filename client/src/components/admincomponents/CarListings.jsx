import React, { useState } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { deleteCar } from "../../store/slices/categorySlice";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";

const CarListings = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const itemsPerPage = 30;
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);

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

  const handleDeleteClick = (id) => {
    setCarIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (carIdToDelete) {
      deletCar(carIdToDelete);
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const getFilteredCars = () => {
    if (!searchInput.trim()) {
      return cars;
    }
    return cars.filter(
      (car) =>
        (car.listingTitle &&
          car.listingTitle
            ?.toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (car.carModal &&
          car.carModal?.vehicleModal
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (car.description &&
          car.description?.toLowerCase().includes(searchInput.toLowerCase()))
    );
  };

  const getSortedCars = (carsToSort) => {
    switch (sortOption) {
      case "price":
        return [...carsToSort].sort((a, b) => (a.price || a.discountedPrice) - (b.price || b.discountedPrice));
      case "year":
        return [...carsToSort].sort((a, b) => a.year - b.year);
      default:
        return carsToSort;
    }
  };

  const getDisplayedCars = () => {
    const filteredCars = getFilteredCars();
    const sortedCars = getSortedCars(filteredCars);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCars.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>My Listings</h3>
          <small>List of vehicles Uploaded for Buy Now</small>
        </span>
        <NavLink to="/admin/addbuynow" className="add-vehicle-button">
          Add New Vehicle ↗
        </NavLink>
      </div>
      <div className="car-list-container">
        <header className="car-list-header">
          <div className="car-list-header-input">
            <Search />
            <input
              type="text"
              placeholder="Search Cars e.g., Audi Q7"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="all">All</option>
              <option value="price">Price</option>
              <option value="year">Year</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Transmission</th>
                <th>FuelType</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedCars().map(
                (car, index) =>
                  car.sellingType === "fixed" && (
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
                              <h6>{car.discountedPrice}</h6>
                              {car.price && <p>{car.price}</p>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <small>{car.carModal || "No Model"}</small>
                      </td>
                      <td>
                        <small>{car.year || "No Year"}</small>
                      </td>
                      <td>
                        <small>{car.transmission || "No Transmission"}</small>
                      </td>
                      <td>
                        <small>{car.fuelType || "No Fuel Type"}</small>
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => handleDeleteClick(car._id)}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal show={showModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm to Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this car listing?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarListings;
