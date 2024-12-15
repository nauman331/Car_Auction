// Orders Component
import React, { useState } from 'react';
import '../../assets/stylesheets/admin/carlisting.scss';
import { Trash, PencilLine, Search } from 'lucide-react';
import Pagination from './Pagination'; // Import the Pagination component

const cars = Array(500).fill({
  make: 'Mercedes-Benz, C Class',
  lotno: '8735647477',
  price: 'AED 5500',
  ordertype: 'Auction',
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

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Orders</h3>
          <small>List of orders placed by users</small>
        </span>
      </div>
      <div className="car-list-container">
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
                      <div className="car-name">
                        <p>{car.make}</p>
                        <p>Lot no: {car.lotno}</p>
                      </div>
                    </div>
                  </td>
                  <td>{car.price}</td>
                  <td>{car.ordertype}</td>
                  <td>{car.buyerid}</td>
                  <td>{car.orderstatus}</td>
                  <td className="action-buttons">
                    <button>
                      <Trash size={16} />
                    </button>
                    <button>
                      <PencilLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Orders;
