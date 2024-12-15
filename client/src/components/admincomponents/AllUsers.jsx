import React, { useState, useEffect } from "react";
import {
  Trash,
  Search,
  PencilLine,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import { deleteUser } from "../../store/slices/categorySlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { allusers } = useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); // Added state for sorting
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const deleteUser = async (id) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        dispatch(deleteUser({ id }));
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    deleteUser(userIdToDelete);
    setShowModal(false);
    setUserIdToDelete(null);
  };

  useEffect(() => {
    let filtered = allusers;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort option filter
    if (sortOption) {
      if (sortOption === "verified") {
        filtered = filtered.filter((user) => user.isVerified === true);
      } else if (sortOption === "not verified") {
        filtered = filtered.filter((user) => user.isVerified === false);
      } else {
        filtered = filtered.filter((user) => user.role === sortOption);
      }
    }

    setFilteredUsers(filtered);
  }, [searchQuery, allusers, sortOption]);

  const getDisplayedUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>All Users</h3>
          <small>Delete users from here</small>
        </span>
      </div>

      <div className="car-list-container">
        <header className="car-list-header">
          <div className="car-list-header-input">
            <Search />
            <input
              type="text"
              placeholder="Search user by id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">All</option>
              <option value="Vendor">Vendor</option>
              <option value="customer">Customer</option>
              <option value="Admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="verified">Verified</option>
              <option value="not verified">Not Verified</option>
            </select>
          </div>
        </header>

        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>User ID</th>
                <th>Joined</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedUsers().map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="car-info">
                      <div className="car-image">
                        <img
                          src={user.avatarImage || user.profileImage}
                          alt="..."
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user._id || "No User ID"}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString() || "No Date"}
                  </td>
                  <td>{user.role || "No Role"}</td>
                  <td>
                    {user.isVerified ? "Verified" : "Not Verified" || "No Status"}
                  </td>
                  <td className="action-buttons">
                    <button onClick={() => confirmDelete(user._id)}>
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
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal for delete confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default AllUsers;
