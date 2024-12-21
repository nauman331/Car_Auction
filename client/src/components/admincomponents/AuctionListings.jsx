import React, { useEffect, useState } from "react";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import FormGrid from "./AddBuyNow/FormGrid";

const AuctionListings = () => {
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [auctionIdToDelete, setAuctionIdToDelete] = useState(null);
  const [auctionIdToEdit, setAuctionIdToEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 10;

  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  const fields = [
    {
      id: "auctionTitle",
      label: "Auction Title",
      type: "text",
      placeholder: "Enter title",
    },
    {
      id: "location",
      label: "Location",
      type: "select",
      placeholder: "Select Location",
      options: generateOptions("auction-location", "auctionLocation"),
    },
    {
      id: "totalVehicles",
      label: "Total Vehicles",
      type: "number",
      placeholder: "Enter total vehicles",
    },
    {
      id: "auctionDate",
      label: "Auction Date",
      type: "date",
      placeholder: "Select date",
    },
    {
      id: "auctionTime",
      label: "Auction Time",
      type: "time",
      placeholder: "Select time",
    },
    {
      id: "statusText",
      label: "Status",
      type: "select",
      options: [
        { value: "Ongoing", label: "Ongoing" },
        { value: "Pending", label: "Pending" },
        { value: "Compeleted", label: "Compeleted" },
      ],
      placeholder: "Select status",
    },
  ];

  // Filter auctions by search query and status
  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch = auction.auctionTitle
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "ongoing" && auction.statusText === "Ongoing") ||
      (statusFilter === "pending" && auction.statusText === "Pending") ||
      (statusFilter === "compeleted" && auction.statusText === "Compeleted");
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

  const getAllAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        setAuctions(res_data);
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAuctions();
  }, [token]);

  const deleteCar = async (id) => {
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

  const handleEditSubmit = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/auction/${auctionIdToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Auction Updated Successfully");
        setShowEditModal(false);
        getAllAuctions();
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while updating auction");
    }
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
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value.toLowerCase())
                  }
                >
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
                      <td>
                        {auction.location?.auctionLocation || "No Location"}
                      </td>
                      <td>{auction.totalVehicles || "No Vehicles"}</td>
                      <td>
                        {new Date(auction.auctionDate).toLocaleDateString() ||
                          "No Date"}
                        <br />
                        <small>{auction.auctionTime || "No Time"}</small>
                      </td>
                      <td>{auction.statusText || "No Status"}</td>
                      <td className="action-buttons">
                        <button
                          onClick={() => {
                            setAuctionIdToDelete(auction._id); // Set the auction ID to delete
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setAuctionIdToEdit(auction._id);
                            setFormData({
                              auctionTitle: auction.auctionTitle,
                              auctionLocation:
                                auction.location?.auctionLocation || "",
                              totalVehicles: auction.totalVehicles || 0,
                              auctionDate: auction.auctionDate || "",
                              auctionTime: auction.auctionTime || "",
                              statusText: auction.statusText || "",
                            });
                            setShowEditModal(true);
                          }}
                        >
                          <PencilLine size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {auctions.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this auction event?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCar(auctionIdToDelete)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Auction Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Auction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-container">
                <div className="form-section">
                  <div className="form-grid">
                    <FormGrid
                      fields={fields}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default AuctionListings;
