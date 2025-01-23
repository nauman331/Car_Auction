import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import Select from "react-select";

const DepositDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, deposits } = location.state || { user: {}, deposits: [] };
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null);

  if (!user || !deposits.length) {
    return <p>Error: Missing user or deposit details. Please try again.</p>;
  }

  const updateDeposit = async (invNumber, selectedStatus) => {
    const numericInvNumber = Number(invNumber);
    if (isNaN(numericInvNumber)) {
      console.error("Invalid invNumber:", invNumber);
      toast.error("Invalid Invoice Number");
      return;
    }

    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/wallet/update-deposite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          userId: user._id,
          invNumber: numericInvNumber,
          status: selectedStatus,
        }),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        navigate("/admin/deposits");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error approving deposit:", error);
      toast.error("Error in approving deposit");
    } finally {
      setLoading(false)
    }
  };

  const statusOptions = [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "pending", label: "Payment Pending" },
  ];

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
  };

  const handleUpdateClick = (invNumber) => {
    if (status && status.value) {
      updateDeposit(invNumber, status.value);
    } else {
      toast.error("Please select a status to update.");
    }
  };

  const renderDeposits = (filterCondition) =>
    deposits.filter(filterCondition).map((deposit, index) => (
      <div className="col-lg-6 mb-4" key={deposit._id}>
        <div className="form-container">
          <div className="text-center d-flex align-items-center gap-3 flex-wrap mb-5">
            <h3>Request# {index + 1}</h3>
            <a
              href={encodeURI(deposit?.inv)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-light px-4 py-2 rounded text-decoration-none"
            >
              Proof ↗
            </a>
          </div>
          <table
            className="table table-hover"
            style={{ fontFamily: "DM Sans" }}
          >
            <tbody>
              <tr>
                <td className="col-md-6">Invoice Number</td>
                <td className="col-md-6">
                  <p>{deposit?.invNumber || "N/A"}</p>
                </td>
              </tr>
              <tr>
                <td className="col-md-3">Deposit Date</td>
                <td className="col-md-9">
                  <p>
                    {new Date(deposit?.depositeDate).toLocaleDateString() ||
                      "N/A"}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="col-md-6">Status</td>
                <td className="col-md-6">
                  <p>{deposit?.status === "pending" ? "Payment Pending" : deposit?.status?.charAt(0).toUpperCase() + deposit?.status?.slice(1) || "N/A"}</p>
                </td>
              </tr>
              <tr>
                <td className="col-md-6">Amount</td>
                <td className="col-md-6">
                  <p>AED {deposit?.amount || "N/A"}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-section">
            <div className="form-grid">
              <div className="input-container d-flex align-items-center gap-3">
                <Select
                  options={statusOptions}
                  placeholder="Select Status"
                  value={status}
                  onChange={handleStatusChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  id="status"
                />
                <label htmlFor="status">Select Status</label>
                <button
                  className="place-bid"
                  style={{backgroundColor: loading && "#167CB9"}}
                  disabled={loading}
                  onClick={() => handleUpdateClick(deposit.invNumber)}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Deposit Details</h3>
          <small>All Deposit Requests made by this user</small>
        </span>
      </div>
      <div className="form-container">
        <div className="form-section">
          <div className="container">
            <div className="row" style={{ marginBottom: "-5rem" }}>
              <div className="col-xs-6 col-sm-8 col-md-10 text-right mb-4">
                <p>
                  <strong>User ID</strong>: {user._id}
                </p>
                <p>
                  <strong>Name</strong>: {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <h1 className="mt-5">New Deposits</h1>
              {renderDeposits((deposit) => deposit.status !== "approved").length > 0 ? renderDeposits((deposit) => deposit.status !== "approved") : <h4 className="text-center my-5">No New Deposits Found</h4>}
            </div>

            <div className="row mt-5">
              <h1 className="mt-5">Deposit History</h1>
              {renderDeposits((deposit) => deposit.status === "approved").length > 0 ? renderDeposits((deposit) => deposit.status === "approved") : <h4 className="text-center my-5">No Deposits History Available</h4>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositDetail;
