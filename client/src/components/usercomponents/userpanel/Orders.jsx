import React, { useState, useEffect } from 'react';
import '../../../assets/stylesheets/admin/carlisting.scss';
import { Search } from 'lucide-react';
import Pagination from '../../admincomponents/Pagination';
import { useSelector } from 'react-redux';
import LoadingSpinner from "../../usercomponents/LoadingSpinner";
import { backendURL } from '../../../utils/Exports';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const getInvoices = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/purchase-invoice/get-inoivces`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setInvoices(res_data);
      } else {
        console.error(res_data.message);
      }
    } catch (error) {
      console.error('Error in getting invoices', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getFilteredInvoices = () => {
    return invoices.filter((invoice) => {
      const title = invoice?.carId?.listingTitle?.toLowerCase() || '';
      const lotNo = invoice?.carId?.lotNo?.toString() || '';
      return title.includes(filterText) || lotNo.includes(filterText);
    });
  };

  const getSortedInvoices = (filteredInvoices) => {
    if (sortOption === 'paid') {
      return [...filteredInvoices].sort((a, b) => b.paidAmount - a.paidAmount);
    }
    if (sortOption === 'pendingAmount') {
      return [...filteredInvoices].sort((a, b) => b.pendingAmount - a.pendingAmount);
    }
    return filteredInvoices; // Default: No sorting
  };

  const getDisplayedInvoices = () => {
    const filtered = getFilteredInvoices();
    const sorted = getSortedInvoices(filtered);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
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
            <input
              type="text"
              placeholder="Search Orders e.g., Lot No"
              value={filterText}
              onChange={handleFilterChange}
            />
          </div>
          <div className="sort-options">
            <span>Sort by:</span>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">All</option>
              <option value="paid">Paid Amount</option>
              <option value="pendingAmount">Pending Amount</option>
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
                <th>Buyer</th>
                <th>Payment Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedInvoices().map((invoice, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/user/invoice/${invoice?.invNumber}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="car-info">
                      <div className="car-image">
                        <img
                          src={invoice?.carId?.carImages[0] || ''}
                          alt="Car Image"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div className="car-name">
                        <p>{invoice?.carId?.listingTitle || ''}</p>
                        <p>VIN: {invoice?.carId?.vin || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td>AED {invoice?.paidAmount || 0}</td>
                  <td>AED {invoice?.pendingAmount || 0}</td>
                  <td>
                    {invoice?.userId?.firstName || ''} {invoice?.userId?.lastName || ''}
                  </td>
                  <td>{invoice?.paymentStatus ? 'Full Paid' : 'Pending Payment' || 'No Status'}</td>
                  <td>AED {invoice?.totalAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {getFilteredInvoices().length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
