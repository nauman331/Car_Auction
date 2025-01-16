import React, { useState, useEffect } from "react";
import { Trash, Search, PencilLine } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button, Form } from "react-bootstrap";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateloading, setUpdateloading] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleUserClick = (user) => {
    navigate("/admin/userdetails", { state: { user } });
  };


  const getAllUsers = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/user/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data);
        setAllusers(res_data);
      } else {
        console.error(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [token]);

  const updateUserRoleStatus = async (id, role, isVerified) => {
    setUpdateloading(true);
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ role, isVerified }),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        getAllUsers();
        setShowEditModal(false);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while updating user role/status");
    } finally {
      setUpdateloading(false);
    }
  };
  const deletUser = async (id) => {
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
        getAllUsers();
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };
  const confirmDelete = (id) => {
    setUserIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    deletUser(userIdToDelete);
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    if (userToEdit) {
      const { _id, role, isVerified } = userToEdit;
      updateUserRoleStatus(_id, role, isVerified);
    }
  };

  useEffect(() => {
    let filtered = allusers;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="car-list-top">
            <span>
              <h3>All Users</h3>
              <small>Delete users from here</small>
            </span>
          </div>

          <div className="car-list-container container">
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
                  <option value="buyer">Buyer</option>
                  <option value="admin">Admin</option>
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
                      <td 
                      style={{ cursor: "pointer", marginBottom: "10px" }}
                      onClick={() => handleUserClick(user)}
                      >{user._id || "No User ID"}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString() ||
                          "No Date"}
                      </td>
                      <td>{user.role || "No Role"}</td>
                      <td>
                        {user.isVerified
                          ? "Verified"
                          : "Not Verified" || "No Status"}
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => confirmDelete(user._id)}>
                          <Trash size={16} />
                        </button>
                        <button onClick={() => handleEditClick(user)}>
                          <PencilLine size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {allusers.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Modal for delete confirmation */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                No
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for editing role/status */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User Role & Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={userToEdit?.role || ""}
                    onChange={(e) =>
                      setUserToEdit((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  >
                    <option value="Vendor">Vendor</option>
                    <option value="Buyer">Buyer</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={userToEdit?.isVerified ? "Verified" : "Not Verified"}
                    onChange={(e) =>
                      setUserToEdit((prev) => ({
                        ...prev,
                        isVerified: e.target.value === "Verified",
                      }))
                    }
                  >
                    <option value="Verified">Verified</option>
                    <option value="Not Verified">Not Verified</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateUser}
                disabled={updateloading}
              >
                {updateloading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default AllUsers;
