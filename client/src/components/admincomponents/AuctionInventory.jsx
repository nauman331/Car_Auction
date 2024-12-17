import React, { useState } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar, updateCar } from "../../store/slices/categorySlice";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination"; // Import Pagination Component

const AuctionInventory = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all"); // State for sorting

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCarDetails, setCurrentCarDetails] = useState({}); // Store Car Details

  const itemsPerPage = 10;

  // Filter cars by search term
  const filteredCars = cars.filter(
    (car) =>
      car.listingTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.lotNo?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.auctionLot?.auctionTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter cars by sorting option
  const sortedCars = filteredCars.filter((car) => {
    if (sortOption === "ongoing") return car.auctionStatus; // True for Ongoing
    if (sortOption === "not started") return !car.auctionStatus; // False for Not Started
    return true; // All cars
  });

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
        setShowModal(false); // Close the modal after deletion
        setCarIdToDelete(null); // Clear the ID after deletion
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setCarIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCarIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    deletCar(carIdToDelete);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getDisplayedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCars.slice(startIndex, startIndex + itemsPerPage);
  };

  // Open Edit Modal with Car Details
  const openEditModal = (car) => {
    setCurrentCarDetails({
      id: car._id,
      startingBid: car.startingBid || "",
      bidMargin: car.bidMargin || "",
      lotNo: car.lotNo || "",
      listingTitle: car.listingTitle || "",
      description: car.description || "",
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCarDetails({ ...currentCarDetails, [name]: value });
  };

  const submitUpdatedCar = async () => {
    setLoading(true);
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/car/${currentCarDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(currentCarDetails),
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(updateCar(res_data));
        toast.success("Car details updated successfully!");
        setShowEditModal(false);
      } else {
        toast.error(res_data.message || "Failed to update car.");
      }
    } catch (error) {
      toast.error("Error occurred while updating car details.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>My Listings</h3>
          <small>List of vehicles Uploaded for Buy Now</small>
        </span>
        <NavLink to="/admin/addauction" className="add-vehicle-button">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)} // Handle sorting option change
            >
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="not started">Not Started</option>
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
                        <button onClick={() => confirmDelete(car._id)}>
                          <Trash size={16} />
                        </button>
                        <button onClick={() => openEditModal(car)}>
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
          totalPages={Math.ceil(sortedCars.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Edit Car Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mt-2">
              <label className="m-1">Car Title</label>
              <input
                type="text"
                className="form-control"
                name="listingTitle"
                value={currentCarDetails.listingTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label className="m-1">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={currentCarDetails.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label className="m-1">Lot No</label>
              <input
                type="text"
                className="form-control"
                name="lotNo"
                value={currentCarDetails.lotNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label className="m-1">Starting Bid</label>
              <input
                type="number"
                className="form-control"
                name="startingBid"
                value={currentCarDetails.startingBid}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label className="m-1">Bid Margin</label>
              <input
                type="number"
                className="form-control"
                name="bidMargin"
                value={currentCarDetails.bidMargin}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
  variant="primary"
  onClick={submitUpdatedCar}
  disabled={loading}
>
  {loading ? "Saving..." : "Save Changes"}
</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this car listing?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuctionInventory;
