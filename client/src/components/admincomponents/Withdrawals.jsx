import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";

const Withdrawals = () => {
  const { token } = useSelector((state) => state.auth);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);

  // Fetch withdrawals data
  const getWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet/get-withdraw-request`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data)
        setWithdrawals(
          data.map((item) => ({
            user: item.user,
            withdrawals: item.withdrawHistory || [],
          }))
        );
      } else {
        console.error(data.message || "Failed to fetch withdrawals.");
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getWithdrawals();
    }
  }, [token]);

  useEffect(() => {
    let filtered = [...withdrawals];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.user?.includes(searchQuery) ||
          item.withdrawals.some((d) =>
            d.invNumber?.toString().includes(searchQuery)
          )
      );
    }

    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        const pendingA = a.withdrawals.filter((d) => d.status !== "approved").length;
        const pendingB = b.withdrawals.filter((d) => d.status !== "approved").length;
        return sortOption === "asc" ? pendingA - pendingB : pendingB - pendingA;
      });
    }

    setFilteredWithdrawals(filtered);
  }, [searchQuery, withdrawals, sortOption]);

  const getDisplayedWithdrawals = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredWithdrawals.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleRowClick = (user, withdrawals) => {
    navigate(`/admin/withdraw`, { state: { user, withdrawals } });
  };

  const calculateTotals = (withdrawals) => {
    return withdrawals.reduce(
      (acc, withdrawal) => {
        if (withdrawal.status !== "approved") {
          return {
            totalRequests: acc.totalRequests + 1,
            totalAmount: acc.totalAmount + (withdrawal.amount || 0),
          };
        }
        return acc;
      },
      { totalRequests: 0, totalAmount: 0 }
    );
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="car-list-top d-block">
            <h3>withdrawals</h3>
            <small>List of all withdrawals made by users</small>
          </div>

          <div className="car-list-container container">
            <header className="car-list-header">
              <div className="car-list-header-input">
                <Search />
                <input
                  type="text"
                  placeholder="Search by user id"
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
                  <option value="asc">low to high</option>
                  <option value="desc">high to low</option>
                </select>
              </div>
            </header>
            <div className="table-wrapper">
              <table className="car-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Pending Requests</th>
                    <th>Pending Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedWithdrawals().length > 0 ? (
                    getDisplayedWithdrawals().map((item) => {
                      const { user, withdrawals } = item;
                      const { totalRequests, totalAmount } = calculateTotals(
                        withdrawals
                      );
                      return (
                        <tr
                          key={user._id}
                          onClick={() => handleRowClick(user, withdrawals)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{user || "N/A"}</td>
                          <td>{totalRequests || 0}</td>
                          <td>{totalAmount} AED</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No withdrawals available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredWithdrawals.length > itemsPerPage && (
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

export default Withdrawals;
