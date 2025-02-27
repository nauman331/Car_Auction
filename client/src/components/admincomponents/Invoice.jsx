import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import "../../assets/stylesheets/admin/carlisting.scss";
import "../../assets/stylesheets/admin/addbuynow.scss";
import jsPDF from "jspdf";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Select from "react-select";
import proof from "../../assets/images/paid.jpg";
import Logo from "../../assets/images/Logo.png"

const Invoice = () => {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [status, setStatus] = useState("");
    const invoiceRef = useRef();

    const getInvoice = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/purchase-invoice/get-invoice/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
            });
            const res_data = await response.json();
            if (response.ok) {
                console.log(res_data);
                setInvoice(res_data);
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            console.error("Error fetching invoice");
        } finally {
            setLoading(false);
        }
    };

    const printInvoice = async () => {
        const element = invoiceRef.current;
        const images = element.querySelectorAll("img");
        const loadImagePromises = Array.from(images).map((img) => {
            return new Promise((resolve, reject) => {
                const imgEl = new Image();
                imgEl.crossOrigin = "anonymous"; // Ensure cross-origin images are handled
                imgEl.src = img.src;
                imgEl.onload = resolve;
                imgEl.onerror = reject;
            });
        });

        try {
            await Promise.all(loadImagePromises); // Wait for all images, including the logo, to load
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true, // Enable cross-origin for rendering
                allowTaint: false,
                ignoreElements: (el) => el.id === "no-print",
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Add padding
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight); // Apply left and right padding
            pdf.save(`invoice_${invoice?.invNumber || "N/A"}.pdf`);
        } catch (error) {
            toast.error("Failed to render the invoice.");
        }
    };

    useEffect(() => {
        getInvoice();
    }, [id]);

    if (loading) return <LoadingSpinner />;

    const statusOptions = [
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "payment pending", label: "Payment Pending" },
    ];

    const updateStatus = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            setUpdateLoading(true)
            const response = await fetch(`${backendURL}/purchase-invoice/update-invoice/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ statusText: status.value }),
            });
            const res_data = await response.json();
            console.log(res_data)
            if (response.ok) {
                toast.success(res_data.message);
                getInvoice()
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            toast.error("Error while updating status");
        } finally {
            setUpdateLoading(false)
        }
    };

    return (
        <Container className="my-4" ref={invoiceRef}>
            <Row className="justify-content-between align-items-center mb-4">
                <Col xs={6} sm={4} id="no-print">
                    <Button style={{backgroundColor: "#405FF2", border: "2px solid #405FF2"}} className="px-4 py-2" onClick={printInvoice}>
                        Print this Invoice ↗
                    </Button>
                </Col>
                <Col xs={6} sm={4} className="text-end">
                    <h4>Status: {invoice?.statusText?.charAt(0).toUpperCase() + invoice?.statusText?.slice(1) || ""}</h4>
                </Col>
            </Row>

            <Row>
                <Col>
                    <img src={Logo} alt="..."
                        style={{ height: "5rem", width: "8rem" }}
                        className="mb-5"
                    />
                </Col>
                <Col className="text-end">
                    <h5 className="fw-bold">
                        Invoice # <span style={{ color: "#405FF2", fontSize: "15px" }}>{invoice?.invNumber || "N/A"}</span>
                    </h5>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={6}>
                    <p className="mb-1 fw-bold">Invoice Date:</p>
                    <p>{new Date(invoice?.createdAt).toLocaleDateString() || ""}</p>

                    <p className="mb-1 fw-bold">Customer Details:</p>
                    <p>
                        {invoice?.userId?.firstName || ""} {invoice?.userId?.lastName || ""}
                        <br />
                        {invoice?.userId?._id || ""}
                    </p>
                </Col>

                <Col
                    md={6}
                    className="d-flex align-items-center rounded justify-content-center gap-4 flex-column"
                    style={{ backgroundColor: "#F9FBFC", height: "200px" }}
                    id="no-print"
                >
                    {
                        invoice.invSlip ? <a
                            href={encodeURI(invoice?.invSlip)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light px-4 py-2 rounded text-decoration-none"
                            style={{backgroundColor: "#405FF2", border: "2px solid #405FF2"}}
                        >
                            Proof ↗
                        </a> :
                            <h6>Remaining Payment Proof Not Uploaded Yet</h6>
                    }
                    <div className="form-container" style={{ border: "none", padding: "0px", margin: "0" }}>
                        <div className="form-section">
                            <div className="form-grid">
                                <div
                                    className="input-container d-flex align-items-center gap-3"
                                    id="auction-container1"
                                >
                                    <Select
                                        options={statusOptions}
                                        placeholder="Select Status"
                                        value={status}
                                        onChange={(selectedOption) => setStatus(selectedOption)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        id="auctionLot1"
                                    />
                                    <label htmlFor="auctionLot1">Status</label>
                                    <div className="next-button">
                                    <button 
                                        style={{ backgroundColor: updateLoading ? "gray" : "#405FF2" }}
                                        disabled={updateLoading}
                                        onClick={updateStatus}>
                                        {updateLoading ? "Updating..." : "Update"}
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Vehicle Information</th>
                                <th>Wallet Deduction</th>
                                <th>Pending</th>
                                <th>VAT(5%)</th>
                                <th>Car Amount</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {invoice?.carId?.listingTitle || "N/A"}
                                    <br />
                                    <small>VIN: {invoice?.carId?.vin || 0}</small>
                                </td>
                                <td>AED {invoice?.walletDeduction || 0}</td>
                                <td>AED {invoice?.pendingAmount || 0}</td>
                                <td>AED {invoice?.vat || 0}</td>
                                <td>AED {invoice?.carAmount || 0}</td>
                                <td>AED {invoice?.totalAmount || 0}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="justify-content-end mt-3" >
                <Col xs={12} md={6} lg={4}>
                    <Table>
                        <tbody>
                            <tr>
                                <td className="fw-bold">Total Paid:</td>
                                <td className="text-end">AED {invoice?.paidAmount || 0}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Total Due:</td>
                                <td className="text-end">AED {invoice?.pendingAmount || 0}</td>
                            </tr>
                        </tbody>
                        {invoice?.paymentStatus && (
                            <img
                                src={proof}
                                alt="..."
                                style={{
                                    height: "8rem",
                                    width: "8rem",
                                    float: "right"
                                }}
                            />
                        )}
                    </Table>
                </Col>
            </Row>
            <Row className="mt-5 text-center">
                <hr />
                <Col className="d-flex mt-5 align-items-center w-100 justify-content-evenly flex-wrap gap-3">
                    <a href="https://abaautoauctions.com" style={{ textDecoration: "none" }}>
                        https://abaautoauctions.com
                    </a>
                    <a>Info@abaautoauctions.com</a>
                    <a>+971 509496511</a>
                </Col>
            </Row>
        </Container>
    );
};

export default Invoice;
