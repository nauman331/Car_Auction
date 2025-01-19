import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Search } from "lucide-react";
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
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);

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
        setDeposits(res_data.newDeposits);
      } else {
        console.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting deposits", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getDeposits();
  }, [token]);

  useEffect(() => {
    let filtered = [...deposits];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.user._id.includes(searchQuery) || // Match user ID
          item.deposits.some((d) =>
            d.invNumber?.toString().includes(searchQuery) // Match invoice number
          )
      );
    }

    if (sortOption) {
      filtered = [...filtered].sort((a, b) => {
        const pendingRequestsA = a.deposits.filter(d => d.status !== "approved").length;
        const pendingRequestsB = b.deposits.filter(d => d.status !== "approved").length;
        return sortOption === "asc"
          ? pendingRequestsA - pendingRequestsB
          : pendingRequestsB - pendingRequestsA;
      });
    }

    setFilteredDeposits(filtered);
  }, [searchQuery, deposits, sortOption]);


  const getDisplayedDeposits = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDeposits.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleRowClick = (user, deposits) => {
    console.log(user, deposits)
    navigate(`/admin/deposit`, { state: { user, deposits } });
  };

  const calculateTotalDeposits = (deposits) => {
    return deposits.reduce(
      (acc, deposit) => {
        if (!(deposit.status === "approved")) {
          return {
            totalRequests: acc.totalRequests + 1,
            totalAmount: acc.totalAmount + (deposit.amount || 0),
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
            <h3>Deposits</h3>
            <small>List of all deposits made by users</small>
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
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Pending Requests</th>
                    <th>Pending Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedDeposits()?.length > 0 ? (
                    getDisplayedDeposits().map((item) => {
                      const { user, deposits } = item;
                      const { totalRequests, totalAmount } =
                        calculateTotalDeposits(deposits);
                      return (
                        <tr
                          key={user._id}
                          onClick={() => handleRowClick(user, deposits)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{user._id || "N/A"}</td>
                          <td>{user.firstName || "N/A"}</td>
                          <td>{user.lastName || "N/A"}</td>
                          <td>{totalRequests || 0}</td>
                          <td>{totalAmount || 0} AED</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No deposits available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredDeposits.length > itemsPerPage && (
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
