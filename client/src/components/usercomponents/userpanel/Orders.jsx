// Orders Component
import React, { useState, useEffect } from 'react';
import '../../../assets/stylesheets/admin/carlisting.scss';
import { Search } from 'lucide-react';
import Pagination from '../../admincomponents/Pagination';
import { useSelector } from 'react-redux';
import LoadingSpinner from "../../usercomponents/LoadingSpinner"
import { backendURL } from '../../../utils/Exports';
import toast from 'react-hot-toast';

const Orders = () => {
  const {token} = useSelector((state)=>state.auth)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState([])
  const itemsPerPage = 10;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);


  const getInvoices = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/purchase-invoice/get-inoivces`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data)
        setInvoices(res_data)
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error in getting deposits", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, [token]);

  if(loading) return <LoadingSpinner />

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDisplayedInvoices = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return invoices.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Orders</h3>
          <small>List of orders placed by users</small>
        </span>
      </div>
      <div className="car-list-container container">
        <header className="car-list-header">
          <div className="car-list-header-input">
            <Search />
            <input type="text" placeholder="Search Orders e.g., Lot No" />
          </div>
          <div className="sort-options">
            <span>Type:</span>
            <select>
              <option value="all">All</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Buyer ID</th>
                <th>Payment Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 && getDisplayedInvoices().map((invoice, index) => (
                <tr key={index}>
                  <td>
                    <div className="car-info">
                      <div className="car-image"></div>
                      <div className="car-name">
                        <p>car Title</p>
                        <p>Lot no: 5674838889</p>
                      </div>
                    </div>
                  </td>
                  <td>AED {invoice?.paidAmount || 0}</td>
                  <td>AED {invoice?.pendingAmount || 0}</td>
                  <td>{invoice?.userId}</td>
                  <td>{invoice?.paymentStatus ? "Full Paid" : "Remaining"  || "No Status"}</td>
                  <td>AED {invoice?.totalAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
         getDisplayedInvoices.length > itemsPerPage && 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
}
      </div>
    </>
  );
};

export default Orders;
