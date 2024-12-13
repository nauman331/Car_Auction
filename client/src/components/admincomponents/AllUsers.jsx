import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trash,
  PencilLine,
  Search,
} from "lucide-react";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { backendURL } from "../../utils/Exports";

const AllUsers = () => {
  const { token } = useSelector((state) => state.auth);
  const authorizationToken = `Bearer ${token}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const deleteUser = async (id) => {
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
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    const getAllUsers = async () => {
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
          setUsers(res_data);
        } else {
          console.log(res_data.message);
        }
       
      } catch (error) {
        console.log("Error in getting users");
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, [token]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDisplayedAuctions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
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
          <div className="car-list-container">
            <header className="car-list-header">
              <div className="car-list-header-input">
                <Search />
                <input type="text" placeholder="Search user by id" />
              </div>
              <div className="sort-options">
                <span>Users:</span>
                <select>
                  <option value="all">All</option>
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
                    <th>Auction</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedAuctions().map((user, index) => (
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {renderPagination()}
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
