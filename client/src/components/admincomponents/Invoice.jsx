import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import "../../assets/stylesheets/admin/carlisting.scss";
import jsPDF from "jspdf";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Select from "react-select";

const Invoice = () => {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [status, setStatus] = useState({ value: "Ongoing", label: "Ongoing" });
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
                toast.error(res_data.message);
            }
        } catch (error) {
            toast.error("Error fetching invoice");
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
                allowTaint: false
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
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
        { value: "Ongoing", label: "Ongoing" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" }
    ];

    return (
        <Container className="my-4" ref={invoiceRef}>
            <Row className="justify-content-between align-items-center mb-4">
                <Col xs={6} sm={4}>
                    <Button variant="primary" className="px-4 py-2" onClick={printInvoice}>
                        Download Invoice ↗
                    </Button>
                </Col>
                <Col xs={6} sm={4} className="text-end">
                    <Button variant="primary" className="px-4 py-2" onClick={printInvoice}>
                        Print this Invoice ↗
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 className="fw-bold">BOXCARS</h1>
                </Col>
                <Col className="text-end">
                    <h5 className="fw-bold">Invoice # <span style={{ color: "#050B20", fontSize: "15px" }}>{invoice?.invNumber || "N/A"}</span></h5>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={6}>
                    <p className="mb-1 fw-bold">Invoice Date:</p>
                    <p>{new Date(invoice?.createdAt).toLocaleDateString() || ""}</p>

                    <p className="mb-1 fw-bold">Customer Details:</p>
                    <p>
                        {invoice?.customerName || "John Doe"}
                        <br />
                        {invoice?.customerAddress || "329 Queensberry Street, North Melbourne"}
                        <br />
                        {invoice?.customerCity || "VIC 3051, Australia."}
                    </p>
                </Col>
                <Col md={6} className="d-flex align-items-center rounded-lg justify-content-center" style={{ backgroundColor: "#F9FBFC" }}>
                    <div className="form-container" style={{ border: "none", padding: "0px" }}>
                        <div className="form-section" >
                            <div className="form-grid">
                                <div className="input-container" id="auction-container" >
                                    <Select
                                        options={statusOptions}
                                        placeholder="Select Status"
                                        value={status}
                                        onChange={(selectedOption) => setStatus(selectedOption)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        id="auctionLot"
                                    />
                                    <label htmlFor="auctionLot">Status</label>
                                    <button className="place-bid">
                                        Update
                                    </button>
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
                                <th>Vehicle Price</th>
                                <th>Wallet Deduction</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{invoice?.vehicleInfo || "Standard Plan"}</td>
                                <td>{invoice?.vehiclePrice || "$443.00"}</td>
                                <td>{invoice?.walletDeduction || "-$921.80"}</td>
                                <td>{invoice?.total || "$9243"}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="justify-content-end mt-3">
                <Col xs={12} md={6} lg={4}>
                    <Table>
                        <tbody>
                            <tr>
                                <td className="fw-bold">Total Paid:</td>
                                <td className="text-end">{invoice?.totalPaid || "$9243"}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Total Due:</td>
                                <td className="text-end">{invoice?.totalDue || "$9,750"}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-5 text-center">
                <hr />
                <Col className="d-flex mt-5 align-items-center w-100 justify-content-evenly flex-wrap gap-3">
                    <a href="/" style={{ textDecoration: "none" }}>www.boxcar.com</a>
                    <a>invoice@boxcar.com</a>
                    <a>(123) 123-456</a>
                </Col>
            </Row>
        </Container>
    );
};

export default Invoice;
