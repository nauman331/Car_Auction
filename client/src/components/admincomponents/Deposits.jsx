import React, { useState, useEffect } from "react";
import { Trash, Search, PencilLine } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";

const Deposits = () => {
  const { token } = useSelector((state) => state.auth);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getDeposits = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet/get-deposit-requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data.newDeposits);
        setDeposits(res_data.newDeposits);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeposits();
  }, [token]);

  useEffect(() => {
    let filtered = deposits;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((deposit) =>
        deposit.user?._id?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort option filter
    if (sortOption) {
      if (sortOption === "verified") {
        filtered = filtered.filter((deposit) => deposit.user?.isVerified === true);
      } else if (sortOption === "not verified") {
        filtered = filtered.filter((deposit) => deposit.user?.isVerified === false);
      } else if (sortOption === "amount") {
        filtered = [...filtered].sort((a, b) => {
          const amountA = a.deposits?.reduce((sum, deposit) => sum + deposit.amount, 0) || 0;
          const amountB = b.deposits?.reduce((sum, deposit) => sum + deposit.amount, 0) || 0;
          return amountB - amountA;
        });
      } else if (sortOption === "requests") {
        filtered = [...filtered].sort((a, b) => {
          const requestsA = a.deposits?.length || 0;
          const requestsB = b.deposits?.length || 0;
          return requestsB - requestsA;
        });
      }
    }

    setFilteredUsers(filtered);
  }, [searchQuery, deposits, sortOption]);

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
              <h3>Deposits</h3>
              <small>List of Deposits made by users</small>
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
                  <option value="amount">Amount</option>
                  <option value="requests">Requests</option>
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
                    <th>Deposit Requests</th>
                    <th>Total Amount</th>
                    <th>User Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedUsers().map((user, index) => (
                    <tr key={index} style={{ cursor: "pointer" }}>
                      <td>
                        <div className="car-info">
                          <div className="car-image">
                            <img
                              src={user.user?.avatarImage || user.user?.profileImage}
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
                      <td>{user.user?._id || "No User ID"}</td>
                      <td>{user.deposits?.length || "N/A"}</td>
                      <td>
                        {user.deposits?.reduce((sum, deposit) => sum + deposit.amount, 0) || "N/A"} AED
                      </td>
                      <td>
                        {user.user?.isVerified ? "Verified" : "Not Verified" || "No Status"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {deposits.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Deposits;
