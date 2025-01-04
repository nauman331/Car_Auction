import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { backendURL } from "../../utils/Exports";

const DepositDetail = () => {
  const location = useLocation();
  const { user, deposits } = location.state || { user: {}, deposits: [] };
  const { token } = useSelector((state) => state.auth);

  if (!user || !deposits.length) {
    return <p>Error: Missing user or deposit details. Please try again.</p>;
  }

  const approveDeposit = async (invNumber) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/wallet/approve-deposite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ userId: user._id, invNumber }),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error in approving deposit");
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
                <div className="row">
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
                  <div className="row mt-5" key={deposit._id}>
                    <div className="text-center">
                      <h3>Request# {index + 1}</h3>
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
                    <div className="d-flex justify-content-between gap-3 flex-wrap">
                      <a href={encodeURI(deposit?.inv)} target="_blank" rel="noopener noreferrer" className="place-bid">
                        View Proof
                      </a>
                      <button className="place-bid" onClick={() => approveDeposit(deposit.invNumber)}>
                        Approve Deposit
                      </button>
                    </div>
                  </div>
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
