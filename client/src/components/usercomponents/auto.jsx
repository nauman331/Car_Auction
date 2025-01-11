import React, { useState } from "react";
import "../../assets/stylesheets/sortbydropdown.scss";

function SortByDropdown() {
  const [selectedOption, setSelectedOption] = useState("All");

  const options = ["All", "Monday Auction", "Testing Auction"];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="sort-by-container d-flex justify-content-end">
      <label htmlFor="sort-by-select">Auctions:</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByDropdown;
