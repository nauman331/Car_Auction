import React, { useState } from "react";
import { Trash, PencilLine, Search } from "lucide-react";
import { deleteAuction, updateAuction } from "../../store/slices/categorySlice";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button, Form } from "react-bootstrap";
import Pagination from "./Pagination";

const AuctionListings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { auctions } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [auctionIdToDelete, setAuctionIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 10;

  // Filter auctions by search query and status
  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch = auction.auctionTitle
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "ongoing" && auction.auctionStatus === true) ||
      (statusFilter === "notStarted" && auction.auctionStatus === false);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

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
        setShowDeleteModal(false);
        setAuctionIdToDelete(null);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setAuctionIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setAuctionIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    deletCar(auctionIdToDelete);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDisplayedAuctions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAuctions.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on filter change
  };

  // Handle edit auction
  const handleEditClick = (auction) => {
    setSelectedAuction(auction);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const authorizationToken = `Bearer ${token}`;
    const updatedAuction = selectedAuction;

    try {
      const response = await fetch(`${backendURL}/auction/${updatedAuction._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(updatedAuction),
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(updateAuction(res_data)); // Update Redux state
        toast.success("Auction Updated Successfully");
        setShowEditModal(false); // Close modal after updating
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while updating auction");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAuction((prev) => ({
      ...prev,
      [name]: value === "ongoing" ? true : value === "notStarted" ? false : value, // Toggle to boolean
    }));
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
            <input
              type="text"
              placeholder="Search Auctions e.g., Monday Auction"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <span>Auction:</span>
            <select value={statusFilter} onChange={handleStatusChange}>
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="notStarted">Not Started</option>
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
                      <p>{auction.auctionTitle || "No Title"}</p>
                    </div>
                  </td>
                  <td>{auction.location?.auctionLocation || "No Location"}</td>
                  <td>{auction.totalVehicles || "No Vehicles"}</td>
                  <td>
                    {new Date(auction.auctionDate).toLocaleDateString() || "No Date"}
                    <br />
                    <small>{auction.auctionTime || "No Time"}</small>
                  </td>
                  <td>{auction.auctionStatus ? "Ongoing" : "Not Started" || "No Status"}</td>
                  <td className="action-buttons">
                    <button onClick={() => confirmDelete(auction._id)}>
                      <Trash size={16} />
                    </button>
                    <button onClick={() => handleEditClick(auction)}>
                      <PencilLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this auction event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Auction Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Auction Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Total Vehicles</Form.Label>
              <Form.Control
                type="number"
                name="totalVehicles"
                value={selectedAuction?.totalVehicles || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="auctionStatus"
                value={selectedAuction?.auctionStatus ? "ongoing" : "notStarted"}
                onChange={handleInputChange}
              >
                <option value="ongoing">Ongoing</option>
                <option value="notStarted">Not Started</option>
              </Form.Control>
            </Form.Group>
            <div className="text-end mt-3">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuctionListings;
