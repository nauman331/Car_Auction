import React, { useState } from "react";
import "../../assets/stylesheets/selectcar.scss";

function SearchBar() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(
      `Searching for make: ${selectedMake}, model: ${selectedModel}, price: ${selectedPrice}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-section">
        <div className="search-bar">
          <select value={selectedMake} onChange={handleMakeChange}>
            <option value="">Any Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
          </select>

          <select value={selectedModel} onChange={handleModelChange}>
            <option value="">Any Model</option>
          </select>

          <select value={selectedPrice} onChange={handlePriceChange}>
            <option value="">Any Price</option>
            <option value="10000">Below $10,000</option>
            <option value="20000">Below $20,000</option>
          </select>

          <button type="submit">Search Car</button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
