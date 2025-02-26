import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import Select from "react-select";
import Deposit from "../usercomponents/userpanel/Deposit";
import { Modal, Button } from "react-bootstrap";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import "../../assets/stylesheets/admin/addbuynow.scss"

const WithdrawDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, withdrawals } = location.state || { user: {}, withdrawals: [] };
    const { token } = useSelector((state) => state.auth);
    const [pdf, setPdf] = useState(null);
    const [status, setStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedWithdraw, setSelectedWithdraw] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false);

    if (!user || !withdrawals.length) {
        toast.error("Missing user or withdraw details. Please try again")
        navigate("/admin/withdrawals")
        return;
    }

    useEffect(() => {
        console.log(withdrawals);
    }, []);

    const updatewithdraw = async (invNumber, selectedStatus) => {
        if (!pdf) {
            toast.error("Please upload a proof");
            return;
        }
        const numericInvNumber = Number(invNumber);
        if (isNaN(numericInvNumber)) {
            console.error("Invalid invNumber:", invNumber);
            toast.error("Invalid Invoice Number");
            return;
        }

        const authorizationToken = `Bearer ${token}`;
        try {
            setUpdateLoading(true)
            const uploadResponse = await CloudinaryUploader(pdf);
            const cloudinaryUrl = uploadResponse.url;
            if(!cloudinaryUrl) {
                return;
            }
            const response = await fetch(`${backendURL}/wallet/approve-withdraw-request/${user}/${numericInvNumber}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({
                    invSlip: cloudinaryUrl,
                    status: selectedStatus,
                }),
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                navigate("/admin/withdrawals");
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            console.error("Error approving withdraw:", error);
            toast.error("Error in approving withdraw");
        } finally {
            setUpdateLoading(false)
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

    const handleClearPaymentClick = (withdraw) => {
        setSelectedWithdraw(withdraw);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setStatus(null);
        setSelectedWithdraw(null);
    };

    const handleSubmit = () => {
        if (status && status.value && selectedWithdraw) {
            setUploadLoading(true);
            updatewithdraw(selectedWithdraw.invNumber, status.value);
            setUploadLoading(false);
        } else {
            toast.error("Please select a status to update.");
        }
    };

    const renderwithdrawals = (filterCondition) =>
        withdrawals.filter(filterCondition).map((withdraw, index) => (
            <div className="col-lg-6 mb-4" key={withdraw._id}>
                <div className="form-container">
                    <div className="text-center d-flex align-items-center gap-3 flex-wrap mb-5">
                        <h3>Request# {index + 1}</h3>
                    </div>
                    <table
                        className="table table-hover"
                        style={{ fontFamily: "DM Sans" }}
                    >
                        <tbody>
                            <tr>
                                <td className="col-md-6">Account Number</td>
                                <td className="col-md-6">
                                    <p>{withdraw?.accountNumber || "N/A"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-6">Account Holder Name</td>
                                <td className="col-md-6">
                                    <p>{withdraw?.accountHolderName || "N/A"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-6">Bank Name</td>
                                <td className="col-md-6">
                                    <p>{withdraw?.bankName || "N/A"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-3">Withdraw Date</td>
                                <td className="col-md-9">
                                    <p>
                                        {new Date(withdraw?.withdrawRequestDate).toLocaleDateString() ||
                                            "N/A"}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-6">Status</td>
                                <td className="col-md-6">
                                    <p>{withdraw?.status || "N/A"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-6">Amount</td>
                                <td className="col-md-6">
                                    <p>AED {withdraw?.amount || "N/A"}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="next-button">
                    <button style={{backgroundColor: "#050b20", border: "2px solid #050b20"}} onClick={() => handleClearPaymentClick(withdraw)}>
                        Update Status
                    </button>
                </div>
                </div>
            </div>
        ));

    return (
        <>
            <div className="car-list-top">
                <span>
                    <h3>Withdraw Details</h3>
                    <small>All withdraw Requests made by this user</small>
                </span>
            </div>
            <div className="form-container">
                <div className="form-section">
                    <div className="container">
                        <div className="row" style={{ marginBottom: "-5rem" }}>
                            <div className="col-xs-6 col-sm-8 col-md-10 text-right mb-4">
                                <p>
                                    <strong>User ID</strong>: {user || "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <h1 className="mt-5">New Withdrawals</h1>
                            {renderwithdrawals((withdraw) => withdraw.status !== "approved").length > 0 ? renderwithdrawals((withdraw) => withdraw.status !== "approved") : <h4 className="text-center my-5">No New Withdrawals Found</h4>}
                        </div>

                        <div className="row mt-5">
                            <h1 className="mt-5">Withdrawal History</h1>
                            {renderwithdrawals((withdraw) => withdraw.status === "approved").length > 0 ? renderwithdrawals((withdraw) => withdraw.status === "approved") : <h4 className="text-center my-5">No Withdrawal History Available</h4>}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Withdrawal Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        <h5>Upload Proof of Payment</h5>
                        <Deposit
                            NoInput="true"
                            pdf={pdf}
                            setPdf={setPdf}
                        />
                    </div>

                    <div className="my-4 px-4">
                        <Select
                            options={statusOptions}
                            placeholder="Select Status"
                            value={status}
                            onChange={handleStatusChange}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            id="status"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button style={{backgroundColor: "#050b20", border: "2px solid #050b20"}} onClick={handleSubmit} disabled={uploadLoading || updateLoading}>
                        {uploadLoading || updateLoading ? "Submitting..." : "Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WithdrawDetail;
