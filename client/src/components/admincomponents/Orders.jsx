import React, {useState} from 'react';
import '../../assets/stylesheets/admin/carlisting.scss';
import { ChevronLeft, ChevronRight, Trash, Edit } from 'lucide-react';
import {NavLink} from "react-router-dom"

const cars = Array(500).fill({
  make: 'Mercedes-Benz, C Class',
  lotno: '8735647477',
  price: 'AED 5500',
  ordertype: "Auction",
  buyerid: '132438675849',
  orderstatus: 'Payment Pending',
});

const Orders = () => {  

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const totalPages = Math.ceil(cars.length / itemsPerPage);
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const getDisplayedCars = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return cars.slice(startIndex, startIndex + itemsPerPage);
    };
  
    const renderPagination = () => {
      const visiblePages = [];
      const pageRange = 2;
  
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 || 
          i === totalPages || 
          (i >= currentPage - pageRange && i <= currentPage + pageRange)
        ) {
          visiblePages.push(i);
        } else if (
          (i === currentPage - pageRange - 1 || i === currentPage + pageRange + 1) &&
          !visiblePages.includes('...')
        ) {
          visiblePages.push('...');
        }
      }
  
      return (
        <div className="pagination">
          <button
            className="circle-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          {visiblePages.map((page, index) =>
            page === '...' ? (
              <span key={index} className="dots">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`circle-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
          <button
            className="circle-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      );
    };
  
    return (
      <>
      <div className="car-list-top">
        <span>
      <h3>Orders</h3>
      <small>List of orders placed by user</small>
      </span>
    </div>
      <div className="car-list-container">
       
        <header className="car-list-header">
          <input type="text" placeholder="Search Cars e.g., Audi Q7" />
          <div className="sort-options">
            <span>Type:</span>
            <select>
              <option value="newest">All</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Price</th>
                <th>Order Type</th>
                <th>Buyer ID</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedCars().map((car, index) => (
                <tr key={index}>
                  <td>
                    <div className="car-info">
                      <div className="car-image"></div>
                      <div className='car-name'>
                        <p>{car.make}</p>
                        <p>Lot no:{car.lotno}</p>
                        <div className="price">
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{car.price}</td>
                  <td>{car.ordertype}</td>
                  <td>{car.buyerid}</td>
                  <td>{car.orderstatus}</td>
                  <td className="action-buttons">
                    <button>
                      <Edit size={16} />
                    </button>
                    <button>
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>
      </>
    );
  
};

export default Orders;
