import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { Eye, Search } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../../utils/Exports";
import Pagination from "../../admincomponents/Pagination";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import Deposit from "./Deposit";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader";

const Wallet = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [activeTab, setActiveTab] = useState("deposits"); // State for active tab
  const [depositAmount, setDepositAmount] = useState(0);
  const [pdf, setPdf] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getDeposits = useCallback(async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setDeposits(res_data.depositeHistory);
        setWithdrawals(res_data.withdrawHistory);
        setCurrentBalance(res_data.currentAmount);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting deposits:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getDeposits();
  }, [getDeposits]);

  useEffect(() => {
    let filtered = activeTab === "deposits" ? deposits : withdrawals;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.invNumber?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case "amountAsc":
          filtered = [...filtered].sort((a, b) => a.amount - b.amount);
          break;
        case "amountDesc":
          filtered = [...filtered].sort((a, b) => b.amount - a.amount);
          break;
        case "date":
          filtered = [...filtered].sort(
            (a, b) => new Date(b.date || b.depositeDate) - new Date(a.date || a.depositeDate)
          );
          break;
        case "approved":
          filtered = filtered.filter((item) => item.status === "approved");
          break;
        case "pending":
          filtered = filtered.filter((item) => item.status === "pending");
          break;
        default:
          break;
      }
    }

    setFilteredData(filtered);
  }, [searchQuery, deposits, withdrawals, sortOption, activeTab]);

  const getDisplayedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset pagination on tab switch
    setSearchQuery(""); // Reset search query
  };

  const handleSubmit = async () => {
    if (!pdf || !depositAmount) {
      toast.error("Please upload a file and enter a deposit amount.");
      return;
    }

    try {
      setUploadLoading(true);
      const uploadResponse = await CloudinaryUploader(pdf);
      const cloudinaryUrl = uploadResponse.url;

      const response = await fetch(`${backendURL}/wallet/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: depositAmount,
          inv: cloudinaryUrl,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        toast.success("Deposit request submitted successfully!");
        handleModalClose();
        setLoading(true);
        await getDeposits();
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPdf(null);
    setDepositAmount("");
  };

  const handleModalShow = () => setShowModal(true);

  const handleWithdrawClick = () => {
    if (currentBalance > 1) {
      navigate("/user/withdraw", { state: { balance: currentBalance } });
    } else {
      toast.error("Balance should be greater than zero to withdraw.");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="car-list-top">
            <span>
              <h3>Wallet</h3>
              <small>Manage Deposits and Withdrawals</small>
            </span>
            <div className="last">
              <div className="text">
                <small>Remaining Amount</small>
                <h3>AED {currentBalance || 0}</h3>
              </div>
              <button className="add-vehicle-button" onClick={handleModalShow}>
                Deposit
              </button>
              <button onClick={handleWithdrawClick} className="add-vehicle-button">
                Withdraw
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center my-3">
            <button
              className={`btn me-3 ${activeTab === "deposits" ? "btn-primary" : "btn-outline-primary"}`}
              style={{
                borderRadius: "25px",
                fontWeight: "600",
                padding: "10px 20px",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleTabChange("deposits")}
            >
              Deposit History
            </button>
            <button
              className={`btn ${activeTab === "withdrawals" ? "btn-primary" : "btn-outline-primary"}`}
              style={{
                borderRadius: "25px",
                fontWeight: "600",
                padding: "10px 20px",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleTabChange("withdrawals")}
            >
              Withdraw History
            </button>
          </div>

          <div className="car-list-container container">
            <header className="car-list-header">
              <div className="car-list-header-input">
                <Search />
                <input
                  type="text"
                  placeholder="Search by Invoice Number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="sort-options">
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="">All</option>
                  <option value="amountAsc">low to high</option>
                  <option value="amountDesc">high to low</option>
                  <option value="date">Date</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </header>

            <div className="table-wrapper">
              <table className="car-table">
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedData().map((item, index) => (
                    <tr key={index}>
                      <td>{item.invNumber || "N/A"}</td>
                      <td>
                        {item.withdrawRequestDate
                          || item.depositeDate
                          ? new Date(item.withdrawRequestDate
                            || item.depositeDate).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{item.amount || "N/A"} AED</td>
                      <td>{item.status || "No Status"}</td>
                      <td>
                        <a href={`${item.inv}?attachment=true`} download>
                          <Eye />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Bank Account Details</h5>
            <p>
              Bank Name: XYZ Bank<br />
              Account Number: 1234567890<br />
              IBAN: XYZ12345IBAN<br />
              SWIFT Code: XYZSWIFT
            </p>
          </div>
          <div>
            <h5>Upload Proof of Payment</h5>
            <Deposit
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              pdf={pdf}
              setPdf={setPdf}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={uploadLoading}>
            {uploadLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Wallet;
