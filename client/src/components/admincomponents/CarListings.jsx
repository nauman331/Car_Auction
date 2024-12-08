import React, {useState} from 'react';
import '../../assets/stylesheets/admin/carlisting.scss';
import { ChevronLeft, ChevronRight, Trash, PencilLine, Search } from 'lucide-react';
import {NavLink} from "react-router-dom"

const cars = Array(500).fill({
  make: 'Mercedes-Benz, C Class',
  model: 'Volvo',
  year: 2023,
  transmission: 'Automatic',
  fuelType: 'Petrol',
  price: '$399',
  originalPrice: '$788',
});

const CarListings = () => {  

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
      <h3>My Listings</h3>
      <small>List of vehicles Uploaded fro Buy Now</small>
      </span>
      <NavLink to="/admin/addbuynow" className="add-vehicle-button">Add New Vehicle ↗</NavLink>
    </div>
      <div className="car-list-container">
       
        <header className="car-list-header">
        <div className="car-list-header-input">
                <Search />
          <input type="text" placeholder="Search Cars e.g., Audi Q7" />
            </div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select>
              <option value="newest">Newest</option>
            </select>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="car-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Transmission</th>
                <th>FuelType</th>
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
                        <p>{car.year} C300e AMG Line Night Ed Premium Pl...</p>
                        <div className="price">
                        <h6>{car.price}</h6>
                        {car.originalPrice && <p>{car.originalPrice}</p>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.transmission}</td>
                  <td>{car.fuelType}</td>
                  <td className="action-buttons">
                  <button>
                      <Trash size={16} />
                    </button>
                    <button>
                    <PencilLine size={16}/>
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

export default CarListings;
