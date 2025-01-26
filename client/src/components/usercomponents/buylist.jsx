import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/filter.scss";
import "../../assets/stylesheets/carddata.scss";
import "../../assets/stylesheets/FeatureCategory.scss";
import ProductGridWithPagination from "./autiomap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/Exports";

const BuyfilterForm = () => {
  const { categories } = useSelector((state) => state.category);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [formData, setFormData] = useState({});
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [cars, setCars] = useState([]);

  const applyFilter = async () => {
    const filterData = {
      ...formData,
      priceMin: minPrice,
      priceMax: maxPrice,
      ...(selectedTransmissions.length > 0 && {
        transmission: selectedTransmissions,
      }),
      ...(selectedFuelTypes.length > 0 && { fuelType: selectedFuelTypes }),
    };

    try {
      const response = await fetch(`${backendURL}/car/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setCars(result.data);
      } else {
        console.log("No cars found with the applied filters.");
      }
    } catch (error) {
      console.log("Error applying filter:", error);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [formData, minPrice, maxPrice, selectedTransmissions, selectedFuelTypes]);

  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  const handleMinChange = (event) => {
    const value = Math.max(Number(event.target.value), 100);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = Math.min(Number(event.target.value), 100000);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;

    const updateState = (prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value);
    if (category === "transmission") setSelectedTransmissions(updateState);
    if (category === "fuelType") setSelectedFuelTypes(updateState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div style={{ paddingBottom: 40, backgroundColor: "#050b20" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Buy Now Vehicles
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="Auction-Vehicles-text">
                <h1>Buy Now Vehicles</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 mb-4">
              <form className="form_section">
                <div className="data">
                  <div className="datainput">
                    <select name="carMake" onChange={handleChange}>
                      <option value="" selected>
                        Select Car Make
                      </option>
                      {generateOptions("vehicle-make", "vehicleMake").map(
                        (option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                    <label htmlFor="carMake">Make</label>
                  </div>
                </div>
                <div className="data">
                  <div className=" d-flex flex-direction-row gap-2 datadetails">
                    <div className="datainputs">
                      <label htmlFor="yearMin">Min Year</label>

                      <select name="yearMin" onChange={handleChange}>
                        <option value="" selected>
                          Min Year
                        </option>
                        {generateOptions("vehicle-year", "vehicleYear").map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="datainputs">
                      <label htmlFor="yearMax">Max Year</label>
                      <select name="yearMax" onChange={handleChange}>
                        <option value="" selected>
                          Max Year
                        </option>
                        {generateOptions("vehicle-year", "vehicleYear").map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="driveType" onChange={handleChange}>
                      <option value="" selected>
                        Select Drive Type
                      </option>
                      {generateOptions("drive-type", "driveType").map(
                        (option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        )
                      )}
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
                          <span>AED</span>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={handleMinChange}
                            min="100"
                            max="100000"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="price-input">
                      <div className="input-box">
                        <label>Max price</label>
                        <div className="d-flex">
                          <span>AED</span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={handleMaxChange}
                            min="100"
                            max="100000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-container">
                    {/* Left range slider */}
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      value={minPrice}
                      onChange={(event) => {
                        handleMinChange(event);
                      }}
                      className="slider"
                    />

                    {/* Right range slider */}
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      value={maxPrice}
                      onChange={(event) => {
                        handleMaxChange(event);
                      }}
                      className="slider"
                    />

                    {/* Visual representation of the range track */}
                    <div
                      className="slider-track"
                      style={{
                        left: `${((minPrice - 100) / (100000 - 100)) * 100}%`,
                        right: `${100 - ((maxPrice - 100) / (100000 - 100)) * 100
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="data">
                  <div className="p-3 type-section">
                    <label className="type-text">Transmission</label>
                    <div>
                      {generateOptions(
                        "vehicle-transmission",
                        "vehicleTransimission"
                      ).map((type) => (
                        <label key={type.value}>
                          <input
                            type="checkbox"
                            value={type.value}
                            onChange={(e) =>
                              handleCheckboxChange(e, "transmission")
                            }
                          />
                          {type.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="p-3 type-section">
                    <label className="type-text">Fuel Type</label>
                    <div>
                      {generateOptions(
                        "vehicle-fuel-type",
                        "vehicleFuelTypes"
                      ).map((type) => (
                        <label key={type.value}>
                          <input
                            type="checkbox"
                            value={type.value}
                            onChange={(e) =>
                              handleCheckboxChange(e, "fuelType")
                            }
                          />
                          {type.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="doors" onChange={handleChange}>
                      <option value="" selected>
                        Select Doors
                      </option>
                      {generateOptions("vehicle-door", "vehicleDoor").map(
                        (option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                    <label htmlFor="doors">Doors</label>
                  </div>
                </div>
                <div className="data">
                  <div className="datainput">
                    <select name="cylinders" onChange={handleChange}>
                      <option value="" selected>
                        Select Cylinders
                      </option>
                      {generateOptions(
                        "vehicle-cylinder",
                        "vehicleCylinders"
                      ).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="cylinders">Cylinders</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
              <div>
                <ProductGridWithPagination cars={cars} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyfilterForm;
