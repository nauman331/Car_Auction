import React, { useEffect, useState } from "react";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";

const AuctionListings = () => {
  const { token } = useSelector((state) => state.auth);
  const [auctions, setAuctions] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [auctionIdToDelete, setAuctionIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
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
      (statusFilter === "ongoing" && auction.statusText === "Ongoing") ||
      (statusFilter === "Pending" && auction.statusText === "Pending") ||
      (statusFilter === "Compeleted" && auction.statusText === "Compeleted");
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        setAuctions(res_data)
        console.log(res_data)
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    }
  };

  useEffect(() => {
    getAllAuctions();
  }, [token])
  

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
        toast.success(res_data.message);
        setShowDeleteModal(false);
        setAuctionIdToDelete(null);
        getAllAuctions();
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


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const authorizationToken = `Bearer ${token}`;

    try {
      const response = await fetch(`${backendURL}/auction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Auction Updated Successfully");
        setAuctions(res_data)
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while updating auction");
    } finally {
      setLoading(false)
    }
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
              <option value="pending">Pending</option>
              <option value="compeleted">Compeleted</option>
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
    </>
  );
};

export default AuctionListings;
