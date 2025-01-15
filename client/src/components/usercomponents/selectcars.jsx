import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";  // Import react-select
import "../../assets/stylesheets/selectcar.scss";

function SearchBar() {
  const { categories } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({
    carMake: "",
    carModal: "",
    driveType: "",
  });

  const navigate = useNavigate();

  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  const handleChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption?.value || "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/vehicle");
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",  // Remove border
      boxShadow: "none", // Remove box-shadow if any
      
    }),
    menu: (provided) => ({
      ...provided,
      border: "none",  // Remove the border around the dropdown
      boxShadow: "none", // Remove shadow if any
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0", // Remove padding around the list
      backgroundColor: "white", // Ensure consistent background color
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "none",  // Remove separator line between options
      backgroundColor: state.isFocused ? "#f0f0f0" : "white", // Customize hover color
      color: "#333",  // Customize option text color
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black"
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#333", // Customize arrow color
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#333", // Customize clear indicator color
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-section">
        <div className="search-bar">
          <Select
            className="select-input"
            name="carMake"
            options={generateOptions("vehicle-make", "vehicleMake")}
            onChange={handleChange("carMake")}
            placeholder="Car Make"
            value={generateOptions("vehicle-make", "vehicleMake").find(
              (option) => option.value === formData.carMake
            )}
            isClearable
            styles={customStyles} // Apply custom styles
          />

          <Select
            className="select-input"
            name="carModal"
            options={generateOptions("vehicle-modal", "vehicleModal")}
            onChange={handleChange("carModal")}
            placeholder="Car Model"
            value={generateOptions("vehicle-modal", "vehicleModal").find(
              (option) => option.value === formData.carModal
            )}
            isClearable
            styles={customStyles} // Apply custom styles
          />

          <Select
            className="select-input"
            name="driveType"
            options={generateOptions("drive-type", "driveType")}
            onChange={handleChange("driveType")}
            placeholder="Drive Type"
            value={generateOptions("drive-type", "driveType").find(
              (option) => option.value === formData.driveType
            )}
            isClearable
            styles={customStyles} // Apply custom styles
          />


          <button type="submit">Search Car</button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
