import React, { useState } from "react";
import "../../assets/stylesheets/sortbydropdown.scss";

import SortByDropdown from "./auto";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img6 from "../../assets/images/Surface 1.png";
import img1 from "../../assets/images/save.png";
import img2 from "../../assets/images/speedometer 1.png";
import img3 from "../../assets/images/gasoline-pump 1.png";
import img4 from "../../assets/images/gearbox 1.png";
import img5 from "../../assets/images/right-up 1 (1).png";
const cars = [
  {
    id: 1,
    title: "Mercedes-Benz, C Class",
    image: img6,

    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 2,
    title: "Mercedes-Benz, C Class",
    image: img6,
    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 3,
    title: "Mercedes-Benz, C Class",
    image: img6,
    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 4,
    title: "Honda, Accord",
    image: img6,
    showDetails: false,
  },
  {
    id: 5,
    title: "Volkswagen, CC",
    image: img6,
    showDetails: false,
  },
  {
    id: 6,
    title: "Hyundai, Exter",
    image: img6,
    showDetails: false,
  },
  {
    id: 7,
    title: "Mercedes-Benz, GLA",
    image: img6,
    showDetails: false,
  },
  {
    id: 8,
    title: "Mercedes-Benz, S Class",
    image: img6,
    showDetails: false,
  },
  {
    id: 9,
    title: "BMW 6 Series",
    image: img6,
    showDetails: false,
  },
  {
    id: 10,
    title: "Range Rover, Defender 110",
    image: img6,
    lowmilage: "Low Mileage",
    showDetails: false,
  },
  {
    id: 8,
    title: "Volkswagen, Tiguan",
    image: img6,
    showDetails: false,
  },
  {
    id: 9,
    title: "BMW X1",
    image: img6,

    delete: "$789",
    price: "$399",
    showDetails: true,
  },
  {
    id: 1,
    title: "Mercedes-Benz, C Class",
    image: img6,

    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 2,
    title: "Mercedes-Benz, C Class",
    image: img6,
    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 3,
    title: "Mercedes-Benz, C Class",
    image: img6,
    delaits: "Bid Starting From",
    price: "$399",
    showDetails: true,
  },
  {
    id: 4,
    title: "Honda, Accord",
    image: img6,
    showDetails: false,
  },
  {
    id: 5,
    title: "Volkswagen, CC",
    image: img6,
    showDetails: false,
  },
  {
    id: 6,
    title: "Hyundai, Exter",
    image: img6,
    showDetails: false,
  },
  {
    id: 7,
    title: "Mercedes-Benz, GLA",
    image: img6,
    showDetails: false,
  },
  {
    id: 8,
    title: "Mercedes-Benz, S Class",
    image: img6,
    showDetails: false,
  },
  {
    id: 9,
    title: "BMW 6 Series",
    image: img6,
    showDetails: false,
  },
  {
    id: 10,
    title: "Range Rover, Defender 110",
    image: img6,
    lowmilage: "Low Mileage",
    showDetails: false,
  },
  {
    id: 8,
    title: "Volkswagen, Tiguan",
    image: img6,
    showDetails: false,
  },
  {
    id: 9,
    title: "BMW X1",
    image: img6,

    delete: "$789",
    price: "$399",
    showDetails: true,
  },
];
const itemsPerPage = 12;
const ProductGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCars = cars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div
        className="d-flex justify-content-between pb-3 showing
      "
      >
        <h2 className="showingvehicles">
          Showing {paginatedCars.length} to {cars.length} of 1559 Vehicles
        </h2>
        <div>
          <SortByDropdown />
        </div>
      </div>

      <div className="row">
        {paginatedCars.map((item) => (
          <div
            key={item.id}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-6  col-12 col-12 mb-4 px-2"
          >
            <div className="catagorys-section">
              {/* Image Section */}
              <div className="images-section">
                <img src={item.image} alt={item.title} />
                {item.lowmilage && ( // Render the button only if lowmilage exists
                  <button
                    style={{
                      backgroundColor: "blue",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "300px",
                      fontFamily: "DM Sans",
                    }}
                  >
                    {item.lowmilage}
                  </button>
                )}
                <div className="icons-overlay">
                  <img src={img1} alt="save" />
                </div>
                <div className="budget">
                  <a href="#">{item.budget}</a>
                </div>
              </div>

              {/* Content Section */}
              <div className="Contents-Section">
                <h4>{item.title}</h4>
                <p className="address">2023 C300e AMG Line Night Ed Premium</p>
                <span className="detailsdata">
                  <ul>
                    <li>
                      <img src={img2} />
                      <h5> 26,786 kms</h5>
                    </li>
                    <li>
                      <img src={img3} />
                      <h5>Petrol</h5>
                    </li>
                    <li>
                      <img src={img4} />
                      <h5>Automatic</h5>
                    </li>
                  </ul>
                </span>

                <p className="delete">
                  <span>{item.delaits}</span>
                  <del>{item.delete}</del>
                </p>
                <div className="view-detail-section">
                  <p className="price">{item.price}</p>
                  {item.showDetails && (
                    <div className="viewdetail-btn">
                      <a href="#">
                        View Details
                        <img src={img5} alt="right-up" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", textAlign: "center" }}
        className="pagination-controls"
      >
        <button onClick={handlePrev} disabled={currentPage === 1}>
          <ChevronLeft
            className={`icon ${currentPage === 1 ? "disabled" : ""}`}
          />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            style={{
              padding: "6px 13px",
              margin: "0 5px",
              cursor: "pointer",
              textAlign: "center",
              background: currentPage === index + 1 ? "#000" : "transparent",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "50px",
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          <ChevronRight
            className={`icon ${currentPage === totalPages ? "disabled" : ""}`}
          />
        </button>
      </div>
      <div>
        <h2 className="showingvehicles-text">
          Showing Results {paginatedCars.length} - {cars.length} of 1,415
        </h2>
      </div>
    </div>
  );
};

export default ProductGridWithPagination;
