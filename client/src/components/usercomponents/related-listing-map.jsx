import React, { useState } from "react";
import "../../assets/stylesheets/paggination.scss";
import "../../assets/stylesheets/carddata.scss";
import img1 from "../../assets/images/save.png";
import img2 from "../../assets/images/speedometer 1.png";
import img3 from "../../assets/images/gasoline-pump 1.png";
import img4 from "../../assets/images/gearbox 1.png";
import img5 from "../../assets/images/right-up 1 (1).png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginatedCards = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div>
      {/* Render cards */}
      <div className="row">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="col-xl-3 col-lg-3 col-md-4  col-sm-6  col-12 col-12 mb-4 px-2"
          >
            <div className="catagorys-section">
              {/* Image Section */}
              <div className="images-section">
                <img src={item.image} alt={item.title} />
                {item.lowmilage && ( // Render the button only if lowmilage exists
                  <button
                    style={{
                      backgroundColor: "#405FF2",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontFamily: "DM Sans",
                    }}
                  >
                    {item.lowmilage}
                  </button>
                )}
                {item.greatprice && (
                  <button
                    style={{
                      backgroundColor: "#3D923A",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      border: "none",
                      color: "#ffffff ",
                      fontSize: "14px",
                      fontFamily: "DM Sans",
                    }}
                  >
                    {item.greatprice}
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
                  {/* <span>{item.delete}</span> */}
                  <del>{item.delete}</del>
                </p>
                <div className="view-detail-section">
                  <p className="price">{item.price}</p>
                  <div className="viewdetail-btn">
                    <a href="#">
                      View Details
                      <img src={img5} alt="right-up" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          <ChevronLeft
            className={`icon ${currentPage === 1 ? "disabled" : ""}`}
          />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          <ChevronRight
            className={`icon ${currentPage === totalPages ? "disabled" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PaginatedCards;
