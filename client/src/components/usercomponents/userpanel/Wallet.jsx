import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { Eye, Search } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../../utils/Exports";
import Pagination from "../../admincomponents/Pagination";
import LoadingSpinner from "../LoadingSpinner";
import { NavLink } from "react-router-dom";
import Deposit from "./Deposit";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader"

const Wallet = () => {
  const { token } = useSelector((state) => state.auth);
  const [deposits, setDeposits] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0)
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [pdf, setPdf] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);


  const getDeposits = useCallback(async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet/deposite-history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data)
        setDeposits(res_data.depositeHistory);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getCurrentBalance = useCallback(async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/wallet/current-balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data)

      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getDeposits();
    getCurrentBalance()
  }, [getDeposits, getCurrentBalance]);


  const handleSubmit = async () => {
    if (!pdf || !depositAmount) {
      toast.error("Please upload a file and enter a deposit amount.");
      return;
    }

    try {
      setUploadLoading(true);
      // Upload the PDF to Cloudinary
      const uploadResponse = await CloudinaryUploader(pdf);
      const cloudinaryUrl = uploadResponse.url;

      // Send data to the backend
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
        setLoading(true); // Show loader for refresh
        await getDeposits(); // Refresh deposits list
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setUploadLoading(false); // Stop the spinner
    }
  };


  const handleCombinedSubmit = async () => {
    await handleSubmit(); // Handle the upload and backend submission
    handleModalClose(); // Close the modal
  };


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

  const handleModalClose = () => {
    setShowModal(false);
    setPdf(null);
    setDepositAmount("");
  };

  const handleModalShow = () => setShowModal(true);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="car-list-top">
            <span>
              <h3>Wallet</h3>
              <small>List of Payment Approvals</small>
            </span>
            <div className="last">
              <div className="text">
                <small>Remaining Amount</small>
                <h3>AED {currentBalance}</h3>
              </div>
              <button
                className="add-vehicle-button"
                onClick={handleModalShow}
              >
                Deposit
              </button>
              <NavLink to="/user/withdraw" className="add-vehicle-button">
                Withdraw
              </NavLink>
            </div>
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
                    <th>Invoice Number</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedUsers().map((deposit, index) => (
                    <tr key={index} style={{ cursor: "pointer" }}>

                      <td>{deposit.invNumber || "N/A"}</td>
                      <td>{deposit.depositeDate ? new Date(deposit.depositeDate).toLocaleString() : "N/A"}</td>
                      <td>
                        {deposit.amount || "N/A"} AED
                      </td>
                      <td>
                        {deposit.status || "No Status"}
                      </td>
                      <td>
                        <a href={`${deposit.inv}?attachment=true`} download>
                          <Eye />
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {deposits?.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}

      {/* Modal */}
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
            <div className="form-container">
              <div className="form-section">
                <Deposit depositAmount={depositAmount} setDepositAmount={setDepositAmount} pdf={pdf} setPdf={setPdf} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCombinedSubmit} disabled={uploadLoading}>
            {uploadLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Wallet;
