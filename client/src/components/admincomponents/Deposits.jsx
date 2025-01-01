import React, { useState, useEffect } from "react";
import { CircleCheckBig, Search } from "lucide-react";
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
        console.log(res_data)
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting deposits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeposits();
  }, [token]);

  const approveDeposite = async (userId, invNumber) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/wallet/approve-deposite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ userId, invNumber }) // Corrected the body to send userId and invNumber as an object
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error occurred while approving");
    }
  };


  useEffect(() => {
    // Ensure deposits exist before attempting to process them
    if (deposits && deposits.length > 0) {
      let filtered = deposits.flatMap(depositGroup => depositGroup.deposits); // Flatten the deposits into one list

      // Apply search query filter
      if (searchQuery) {
        filtered = filtered.filter((deposit) =>
          deposit.invNumber.toString().includes(searchQuery) // Search by invoice number
        );
      }

      // Apply sort option filter
      if (sortOption) {
        if (sortOption === "asc") {
          filtered = [...filtered].sort((a, b) => a.amount - b.amount); // Sort by amount in ascending order
        } else if (sortOption === "desc") {
          filtered = [...filtered].sort((a, b) => b.amount - a.amount); // Sort by amount in descending order
        }
      }

      setFilteredDeposits(filtered);
    }
  }, [searchQuery, deposits, sortOption]);


  const getDisplayedDeposits = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDeposits.slice(startIndex, startIndex + itemsPerPage);
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
              <small>List of all deposits made by users</small>
            </span>
          </div>

          <div className="car-list-container">
            <header className="car-list-header">
              <div className="car-list-header-input">
                <Search />
                <input
                  type="text"
                  placeholder="Search by deposit invoice number"
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
                    <th>Deposit Invoice</th>
                    <th>Date</th>
                    <th>Deposit Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedDeposits()?.length > 0 ? (
                    getDisplayedDeposits().map((deposit) => (
                      <tr key={deposit._id}>
                        <td>
                          <a href={`${deposit.inv}?attachment=true`} download>
                            Invoice #{deposit.invNumber || "No Invoice"}
                          </a>
                        </td>
                        <td>{deposit.depositeDate ? new Date(deposit.depositeDate).toLocaleString() : "N/A"}</td>
                        <td>{deposit.amount} AED</td>
                        <td>{deposit.status}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => approveDeposite(deposit._id, deposit.invNumber)} // Make sure to pass the correct values
                        >
                          <CircleCheckBig />
                        </td>
                      </tr>
                    ))
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
