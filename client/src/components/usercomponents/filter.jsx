import React, { useState } from "react";
import "../../assets/stylesheets/filter.scss";
import "../../assets/stylesheets/carddata.scss";
import "../../assets/stylesheets/FeatureCategory.scss";
import ProductGridWithPagination from "./autiomap";

const CarFilterForm = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [formData, setFormData] = useState({});
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(45000);

  // const handleMinChange = (e) => {
  //   const value = Math.min(Number(e.target.value), maxPrice - 1000);
  //   setMinPrice(value);
  // };

  // const handleMaxChange = (e) => {
  //   const value = Math.max(Number(e.target.value), minPrice + 1000);
  //   setMaxPrice(value);
  // };

  const handleMinChange = (event) => {
    const value = Math.max(Number(event.target.value), 5000);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = Math.min(Number(event.target.value), 45000);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div style={{ paddingBottom: 58, backgroundColor: "#050b20" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="home.js">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Auction Vehicles
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="Auction-Vehicles-text">
                <h1>Auction Vehicles List</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="  col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 mb-4">
              <form className="form_section">
                <div className="data">
                  <div className="datainput">
                    <select name="location" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Select Location
                      </option>
                      <option value="new-york">New York</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="chicago">Chicago</option>
                    </select>
                    <label htmlFor="location">Location</label>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="condition" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Select Condition
                      </option>
                      <option value="new-used">New & Used</option>
                      <option value="used">Used</option>
                    </select>
                    <label htmlFor="condition">Condition</label>
                  </div>
                </div>
                <div className="data">
                  <div className="p-3 type-section">
                    <label className="type-text">Type</label>
                    <div>
                      {[
                        "SUV  (1,456)",
                        "Sedan  (1,456)",
                        "Hatchback  (1,456)",
                        "Coupe  (1,456)",
                        "Convertible  (1,456)",
                      ].map((type) => (
                        <label key={type}>
                          <input
                            type="checkbox"
                            value={type}
                            onChange={handleCheckboxChange}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="make" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Add Make
                      </option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="ford">Ford</option>
                    </select>
                    <label htmlFor="make">Make</label>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="model" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Add Model
                      </option>
                      <option value="camry">Camry</option>
                      <option value="civic">Civic</option>
                      <option value="mustang">Mustang</option>
                    </select>
                    <label htmlFor="model">Model</label>
                  </div>
                </div>
                <div className="data">
                  <div className=" d-flex flex-direction-row gap-2 datadetails">
                    <div className="datainputs">
                      <label htmlFor="minYear">Min Year</label>

                      <select name="minYear" onChange={handleChange} required>
                        <option value="" disabled selected hidden>
                          2019
                        </option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                      </select>
                    </div>

                    <div className="datainputs">
                      <label htmlFor="maxYear">Max Year</label>
                      <select name="maxYear" onChange={handleChange} required>
                        <option value="" disabled selected hidden>
                          2023
                        </option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="data">
                  <div className="datainput">
                    <select name="mileage" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Any Mileage
                      </option>
                      <option value="10000">Up to 10,000 miles</option>
                      <option value="50000">Up to 50,000 miles</option>
                    </select>
                    <label htmlFor="mileage">Mileage</label>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="driveType" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Any Type
                      </option>
                      <option value="awd">AWD</option>
                      <option value="fwd">FWD</option>
                      <option value="rwd">RWD</option>
                    </select>
                    <label htmlFor="driveType">Drive Type</label>
                  </div>
                </div>

                <div className="price-slider-container">
                  <h3 className="price-slider-title">Price</h3>
                  <div className="price-inputs">
                    <div className="price-input">
                      <div className="input-box">
                        <label>Min price</label>
                        <div className="d-flex">
                          <span>$</span>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={handleMinChange}
                            min="5000"
                            max="45000"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="price-input">
                      <div className="input-box">
                        <label>Max price</label>
                        <div className="d-flex">
                          <span>$</span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={handleMaxChange}
                            min="5000"
                            max="45000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-container">
                    <div>
                      <input
                        type="range"
                        min="5000"
                        max="45000"
                        value={minPrice}
                        onChange={handleMinChange}
                        className="slider"
                      />
                    </div>
                    <div>
                      <input
                        type="range"
                        min="5000"
                        max="45000"
                        value={maxPrice}
                        onChange={handleMaxChange}
                        className="slider"
                      />
                    </div>
                    <div
                      className="slider-track"
                      style={{
                        left: `${((minPrice - 5000) / 40000) * 100}%`,
                        right: `${100 - ((maxPrice - 5000) / 40000) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="data">
                  <div className="p-3 type-section">
                    <label className="type-text">Transmission</label>
                    <div>
                      {[
                        "Automatic  (1,456)",
                        "Manual  (1,456)",
                        "CVT  (1,456)",
                      ].map((type) => (
                        <label key={type}>
                          <input
                            type="checkbox"
                            value={type}
                            onChange={handleCheckboxChange}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="p-3 type-section">
                    <label className="type-text">Fuel Type</label>
                    <div>
                      {[
                        "Diesel  (1,456)",
                        "Petrol  (1,456)",
                        "Hybird  (1,456)",
                        "Electric  (1,456)",
                      ].map((type) => (
                        <label key={type}>
                          <input
                            type="checkbox"
                            value={type}
                            onChange={handleCheckboxChange}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="doors" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Select Doors
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <label htmlFor="doors">Doors</label>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="cylinders" onChange={handleChange} required>
                      <option value="" disabled selected hidden>
                        Select Cylinders
                      </option>
                      <option value="4">4 </option>
                      <option value="6">6 </option>
                      <option value="8">8 </option>
                    </select>
                    <label htmlFor="cylinders">Cylinders</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
              <div>
                <ProductGridWithPagination sellType="auction"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilterForm;
