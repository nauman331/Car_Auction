import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { backendURL } from "../../../utils/Exports";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import "../../../assets/stylesheets/admin/carlisting.scss";
import jsPDF from "jspdf";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import proof from "../../../assets/images/paid.jpg";
import Logo from "../../../assets/images/Logo.png";
import Deposit from "./Deposit";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader";
// import { PayPalButtons } from "@paypal/react-paypal-js";
import { Wallet } from "lucide-react";

const Invoice = () => {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const invoiceRef = useRef();

    // Function to fetch invoice details
    const getInvoice = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            setLoading(true);
            const response = await fetch(
                `${backendURL}/purchase-invoice/get-invoice/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                }
            );
            const res_data = await response.json();
            if (response.ok) {
                console.log(res_data);
                setInvoice(res_data);
            } else {
                console.error(res_data.message);
            }
        } catch (error) {
            toast.error("Error fetching invoice");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle printing the invoice as a PDF
    const printInvoice = async () => {
        const element = invoiceRef.current;
        const images = element.querySelectorAll("img");
        const loadImagePromises = Array.from(images).map((img) => {
            return new Promise((resolve, reject) => {
                const imgEl = new Image();
                imgEl.crossOrigin = "anonymous";
                imgEl.src = img.src;
                imgEl.onload = resolve;
                imgEl.onerror = reject;
            });
        });

        try {
            await Promise.all(loadImagePromises);
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                ignoreElements: (el) => el.id === "no-print",
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
            pdf.save(`invoice_${invoice?.invNumber || "N/A"}.pdf`);
        } catch (error) {
            toast.error("Failed to render the invoice.");
        }
    };

    // Function to handle modal close
    const handleModalClose = () => setShowModal(false);

    // Function to handle modal open
    const handleModalOpen = () => setShowModal(true);

    // Function to handle proof file upload
    const handleSubmit = async () => {
        if (!pdf) {
            toast.error("Please upload a proof file");
            return;
        }
        const authorizationToken = `Bearer ${token}`;
        try {
            setUploadLoading(true);
            const uploadResponse = await CloudinaryUploader(pdf);
            const cloudinaryUrl = uploadResponse.url;

            const response = await fetch(
                `${backendURL}/purchase-invoice/upload-slip/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify({ invSlip: cloudinaryUrl }),
                }
            );
            const res_data = await response.json();
            if (response.ok) {
                toast.success("Proof uploaded successfully");
                handleModalClose();
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            toast.error("Unknown Error Occured");
        } finally {
            setUploadLoading(false);
        }
    };

    useEffect(() => {
        getInvoice();
    }, [id]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <Container className="my-4" ref={invoiceRef}>
                {/* Header Row */}
                <Row className="justify-content-between align-items-center mb-4">
                    <Col xs={6} sm={4} id="no-print">
                        <Button className="px-4 py-2" onClick={printInvoice}
                            style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }}
                        >
                            Print this Invoice ↗
                        </Button>
                    </Col>
                    <Col xs={6} sm={4} className="text-end">
                        <h4>Status: {invoice?.statusText?.charAt(0).toUpperCase() + invoice?.statusText?.slice(1) || ""}</h4>
                    </Col>
                </Row>

                {/* Logo & Invoice Number */}
                <Row>
                    <Col>
                        <img src={Logo} alt="Logo" style={{ height: "5rem", width: "8rem" }} className="mb-5" />
                    </Col>
                    <Col className="text-end">
                        <h5 className="fw-bold">
                            Invoice # <span style={{ color: "#405FF2", fontSize: "15px" }}>{invoice?.invNumber || "N/A"}</span>
                        </h5>
                    </Col>
                </Row>

                {/* Invoice Details & Payment Option */}
                <Row className="mt-3">
                    <Col md={6}>
                        <p className="mb-1 fw-bold">Invoice Date:</p>
                        <p>{new Date(invoice?.createdAt).toLocaleDateString() || ""}</p>

                        <p className="mb-1 fw-bold">Customer Details:</p>
                        <p>
                            {invoice?.userId?.firstName || ""} {invoice?.userId?.lastName || ""} <br />
                            {invoice?.userId?._id || ""}
                        </p>
                    </Col>

                    {invoice?.statusText === "payment pending" && (
                        <Col md={6} className="d-flex gap-5 align-items-center rounded justify-content-center"
                            style={{ backgroundColor: "#F9FBFC", height: "200px" }} id="no-print">
                            <Button style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }} className="px-4 py-2"
                                onClick={handleModalOpen}>
                                <Wallet /> Pay via Bank
                            </Button>
                        </Col>
                    )}
                </Row>

                {/* Table for Desktop */}
                <Row className="mt-4">
                    <Col>
                        <Table className="table-sm text-center d-none d-md-table">
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }}>Vehicle</th>
                                    <th style={{ width: "15%" }}>Wallet Deduction</th>
                                    <th style={{ width: "15%" }}>Pending</th>
                                    <th style={{ width: "10%" }}>VAT(5%)</th>
                                    <th style={{ width: "15%" }}>Car Amount</th>
                                    <th style={{ width: "15%" }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{invoice?.carId?.listingTitle || "N/A"}<br />
                                        <small>VIN: {invoice?.carId?.vin || 0}</small></td>
                                    <td>AED {invoice?.walletDeduction || 0}</td>
                                    <td>AED {invoice?.pendingAmount || 0}</td>
                                    <td>AED {invoice?.vat || 0}</td>
                                    <td>AED {invoice?.carAmount || 0}</td>
                                    <td>AED {invoice?.totalAmount || 0}</td>
                                </tr>
                            </tbody>
                        </Table>

                        {/* Mobile-Friendly Stacked Format */}
                        <div className="d-block d-md-none">
                            <div className="border p-3 mb-2">
                                <p><strong>Vehicle:</strong> {invoice?.carId?.listingTitle || "N/A"}</p>
                                <p><strong>VIN:</strong> {invoice?.carId?.vin || 0}</p>
                                <p><strong>Wallet Deduction:</strong> AED {invoice?.walletDeduction || 0}</p>
                                <p><strong>Pending:</strong> AED {invoice?.pendingAmount || 0}</p>
                                <p><strong>VAT (5%):</strong> AED {invoice?.vat || 0}</p>
                                <p><strong>Car Amount:</strong> AED {invoice?.carAmount || 0}</p>
                                <p><strong>Total:</strong> AED {invoice?.totalAmount || 0}</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Payment Summary */}
                <Row className="justify-content-end mt-3">
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
                        </Table>

                        {/* Payment Proof Image */}
                        {invoice?.paymentStatus && (
                            <img src={proof} alt="Payment Proof" style={{ height: "8rem", width: "8rem" }} />
                        )}
                    </Col>
                </Row>

                {/* Footer */}
                <Row className="mt-5 text-center">
                    <hr />
                    <Col className="d-flex mt-5 align-items-center w-100 justify-content-evenly flex-wrap gap-3">
                        <a href="https://abaautoauctions.com/" style={{ textDecoration: "none" }}>
                            https://abaautoauctions.com
                        </a>
                        <a>Info@abaautoauctions.com</a>
                        <a>+971 509496511</a>
                    </Col>
                </Row>
            </Container>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Remaining Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Bank Account Details</h5>
                        <p>
                            <strong>Customer Name:</strong> <i>AL BASHAYERA AUTO USED TRADING AND AUCTIONS LLC SP</i><br />
                            <strong>Account Number:</strong> <i>1015877418001</i><br />
                            <strong>IBAN:</strong> <i>AE210260001015877418001</i><br />
                        </p>
                    </div>

                    <div>
                        <h5>Upload Proof of Payment</h5>
                        <Deposit
                            pdf={pdf}
                            setPdf={setPdf}
                            NoInput="true"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }} onClick={handleSubmit} disabled={uploadLoading}>
                        {uploadLoading ? "Submitting..." : "Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Invoice;
