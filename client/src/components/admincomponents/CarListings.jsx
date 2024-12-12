import React, {useState, useEffect} from 'react';
import '../../assets/stylesheets/admin/carlisting.scss';
import { ChevronLeft, ChevronRight, Trash, PencilLine, Search } from 'lucide-react';
import {NavLink} from "react-router-dom"
import {backendURL} from "../../utils/Exports"
import toast from "react-hot-toast";

const CarListings = () => {  

    const [currentPage, setCurrentPage] = useState(1);
    const [cars, setCars] = useState([])
    const itemsPerPage = 30;
    const totalPages = Math.ceil(cars.length / itemsPerPage);

    const getAllCars = async () => {
      try {
        const response = await fetch(`${backendURL}/car`, {
          method: "GET"
        })
        const res_data = await response.json()
        if(!response.ok){
          toast.error(res_data.message)
        }
        setCars(res_data);
        console.log(res_data)
      } catch (error) {
        toast.error("Error Occured while getting all cars")
      }
    }

    useEffect(() => {
     getAllCars()
    }, [])
    
  
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
                car.sellingType === "fixed" && (
                <tr key={index}>
                  <td>
                    <div className="car-info">
                      <div className="car-image">
                        <img src={car.carImages[0]} alt="..." 
                        style={{width: "100%", height: "100%", objectFit: "cover"}}
                        />
                      </div>
                      <div className='car-name'>
                        <p>{car.listingTitle || "No Title"}</p>
                        <p>{car.description || "No Description"}</p>
                        <div className="price">
                        <h6>{car.discountedPrice}</h6>
                        {car.price && <p>{car.price}</p>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><small>{car.carModal || "No Model"}</small></td>
                  <td><small>{car.year || "No Year"}</small></td>
                  <td><small>{car.transmission || "No Transmision"}</small></td>
                  <td><small>{car.fuelType || "No Fuel Type"}</small></td>
                  <td className="action-buttons">
                  <button>
                      <Trash size={16} />
                    </button>
                    <button>
                    <PencilLine size={16}/>
                    </button>
                  </td>
                </tr>
                )
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
