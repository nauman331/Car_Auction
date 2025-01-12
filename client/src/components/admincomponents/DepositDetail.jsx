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
    }
  };

  const statusOptions = [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "verification pending", label: "Verification Pending" },
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
            <div className="row d-flex justify-content-center align-items-center">
              <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                <div className="row" style={{ marginBottom: "-5rem" }}>
                  <div className="col-xs-6 col-sm-8 col-md-10 text-right">
                    <p>
                      <em><strong>User ID</strong>: {user._id}</em>
                    </p>
                    <p>
                      <em><strong>User Role</strong>: {user.role}</em>
                    </p>
                    <p>
                      <em><strong>User Status</strong>: {user.isVerified ? "Verified" : "Not Verified"}</em>
                    </p>
                    <p>
                      <em><strong>Date Joined</strong>: {new Date(user.createdAt).toLocaleDateString()}</em>
                    </p>
                  </div>
                </div>
                {deposits.map((deposit, index) => (
                  !(deposit.status === "approved") && (
                    <div className="row mt-5" key={deposit._id}>
                      <div className="form-container" style={{ marginTop: "7rem" }}>
                        <div className="text-center d-flex align-items-center gap-3 flex-wrap">
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
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <td className="col-md-6">Invoice Number</td>
                              <td className="col-md-6"><em>{deposit?.invNumber || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-3">Deposit Date</td>
                              <td className="col-md-9"><em>{new Date(deposit?.depositeDate).toLocaleDateString() || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-6">Status</td>
                              <td className="col-md-6"><em>{deposit?.status || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-6">Amount</td>
                              <td className="col-md-6"><em>AED {deposit?.amount || "N/A"}</em></td>
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
                                onClick={() => handleUpdateClick(deposit.invNumber)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
                <hr />
                <h1 className="mt-5" style={{ marginBottom: "-5rem" }}>Deposit History</h1>
                {deposits.map((deposit, index) => (
                  deposit.status === "approved" && (
                    <div className="row mt-5" key={deposit._id}>
                      <div className="form-container" style={{ marginTop: "7rem" }}>
                        <div className="text-center d-flex align-items-center gap-3 flex-wrap">
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
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <td className="col-md-6">Invoice Number</td>
                              <td className="col-md-6"><em>{deposit?.invNumber || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-3">Deposit Date</td>
                              <td className="col-md-9"><em>{new Date(deposit?.depositeDate).toLocaleDateString() || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-6">Status</td>
                              <td className="col-md-6"><em>{deposit?.status || "N/A"}</em></td>
                            </tr>
                            <tr>
                              <td className="col-md-6">Amount</td>
                              <td className="col-md-6"><em>AED {deposit?.amount || "N/A"}</em></td>
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
                                onClick={() => handleUpdateClick(deposit.invNumber)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositDetail;
