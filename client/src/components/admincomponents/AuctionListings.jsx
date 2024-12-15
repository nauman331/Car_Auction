import React, { useState } from "react";
import { Trash, PencilLine, Search } from "lucide-react";
import { deleteAuction } from "../../store/slices/categorySlice";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination"; 

const AuctionListings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { auctions } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [auctionIdToDelete, setAuctionIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const itemsPerPage = 30;
  const filteredAuctions = auctions.filter((auction) =>
    auction.auctionTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
        setShowModal(false);
        setAuctionIdToDelete(null); // Clear the ID after deletion
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setAuctionIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                      <p>{auction.auctionTitle || "No Title"}</p>
                    </div>
                  </td>
                  <td>
                    {auction.location && auction.location.auctionLocation || "No Location"}
                  </td>
                  <td>{auction.totalVehicles || "No Vehicles"}</td>
                  <td>
                    {new Date(auction.auctionDate).toLocaleDateString() || "No Date"}
                    <br />
                    <small>{auction.auctionTime || "No Time"}</small>
                  </td>
                  <td>{auction.statusText || "No Status"}</td>
                  <td className="action-buttons">
                    <button onClick={() => confirmDelete(auction._id)}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modal for delete confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this auction event?</Modal.Body>
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

export default AuctionListings;
