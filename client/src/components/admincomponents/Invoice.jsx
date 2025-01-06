import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
    const { id } = useParams();
   const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const invoiceRef = useRef();

    const getInvoice = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/purchase-invoice/get-invoice/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                }
            });
            const res_data = await response.json();
            if (response.ok) {
                console.log(res_data)
                setInvoice(res_data);
            } else {
                console.error(res_data.message);
            }
        } catch (error) {
            console.error("Error fetching invoice:", error);
        } finally {
            setLoading(false);
        }
    };

    const approveInvoice = async () => {
        const authorizationToken = `Bearer ${token}`;
        try {
            const response = await fetch(`${backendURL}/purchase-invoice/approve-invoice/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                }
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                setShowModal(false); // Close modal on success
               navigate("/admin/orders")
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            toast.error("Error while approving the invoice.");
        }
    };

    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Prevent CORS issues
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    };

    const printInvoice = async () => {
        const element = invoiceRef.current;

        // Preload all images in the invoice
        const images = element.querySelectorAll("img");
        const loadImagePromises = Array.from(images).map((img) => preloadImage(img.src));

        try {
            await Promise.all(loadImagePromises); // Wait for all images to load
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true, // Enable cross-origin requests for images
                allowTaint: false
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice_${invoice?.invNumber || "N/A"}.pdf`);
        } catch (error) {
            console.error("Error rendering invoice:", error);
            toast.error("Failed to render the invoice. Please try again.");
        }
    };

    useEffect(() => {
        getInvoice();
    }, [id]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <div className="container">
                <div className="d-flex mb-5 gap-3 flex-wrap align-items-center justify-content-between">
                    <button onClick={printInvoice}>Print Invoice</button>
                    <button onClick={() => setShowModal(true)}>Approve Invoice</button>
                </div>
                <div ref={invoiceRef} className="card">
                    <div className="card-header bg-black" />
                    <div className="card-body">
                        <div className="container">
                            {/* Invoice details */}
                            <div className="row">
                                <div className="col-xl-12">
                                    <img
                                        src="https://th.bing.com/th?id=OIF.mIKJU9dZ9Zdw%2bEM5YhmkXA&rs=1&pid=ImgDetMain"
                                        alt="Logo"
                                        style={{ height: "8rem", width: "8rem" }}
                                        crossOrigin="anonymous" // Ensure CORS compliance
                                    />
                                </div>
                                <div className="col-xl-12">
                                    <ul className="list-unstyled float-end">
                                        <li style={{ fontSize: 30 }}>Company</li>
                                        <li>123, Elm Street</li>
                                        <li>123-456-789</li>
                                        <li>mail@mail.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row text-center">
                                <h3 className="text-uppercase text-center mt-3" style={{ fontSize: 40 }}>Invoice</h3>
                                <p>{invoice?.invNumber || "N/A"}</p>
                            </div>
                            <div className="row mx-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Description</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Total</td>
                                            <td>AED {invoice?.totalAmount || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Paid</td>
                                            <td>AED {invoice?.paidAmount || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Pending</td>
                                            <td>AED {invoice?.pendingAmount || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment Status</td>
                                            <td>{invoice?.paymentStatus ? "Approved" : "Not Approved" || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                                    
                            <div className="row">
                                <div className="col-xl-8">
                                <img
                                        src={invoice?.carId?.carImages[0] || "N/A"}
                                        alt="car Image"
                                        style={{ height: "8rem", width: "8rem" }}
                                        crossOrigin="anonymous" // Ensure CORS compliance
                                    />
                                    <ul className="list-unstyled float-end me-0">
                                        <li><span className="me-3 float-start">Car Name:</span>{invoice?.carId?.listingTitle || "N/A"}</li>
                                        <li><span className="me-3 float-start">Car VIN:</span>{invoice?.carId?.vin || "N/A"}</li> 
                                        <li><span className="me-3 float-start">Car Lot No:</span>{invoice?.carId?.lotNo || "N/A"}</li> 
                                        <li> <span className="me-2">User Id:</span>{invoice?.userId || "N/A"}</li>
                                    </ul>
                                </div>
                            </div>
                            <hr />
                            <div className="row mt-2 mb-5">
                                <p className="fw-bold">Date: <span className="text-muted">{new Date(invoice?.createdAt).toLocaleDateString() || "N/A"}</span></p>
                                <p className="fw-bold mt-3">Signature:</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-black" />
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Approve Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to approve this invoice?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={approveInvoice}>
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Invoice;
