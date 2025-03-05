import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/sortbydropdown.scss";
import { backendURL } from "../../utils/Exports";

const SortByDropdown = ({ onChange, preselected }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [initialized, setInitialized] = useState(false); // Flag to track initialization

  useEffect(() => {
    const getAllAuctions = async () => {
      try {
        const response = await fetch(`${backendURL}/auction`);
        const res_data = await response.json();

        if (response.ok) {
          const sortedOptions = res_data
            .map((auction) => ({
              ...auction,
              fullAuctionDate: new Date(`${auction.auctionDate} ${auction.auctionTime}`),
            }))
            .sort((a, b) => a.fullAuctionDate - b.fullAuctionDate)
            .filter(auction => auction.statusText?.toLowerCase() !== "compeleted"); // Apply filter here

          setOptions(sortedOptions);


          // If preselected is available, set it once
          if (preselected && !initialized) {
            const auctionExists = sortedOptions.some(auction => auction.auctionTitle === preselected);
            if (auctionExists) {
              setSelectedOption(preselected);
              onChange(preselected);
              setInitialized(true); // Set the initialized flag
            }
          } else if (!preselected && sortedOptions.length > 0 && !initialized) {
            // Default to the first auction if no preselected value
            setSelectedOption(sortedOptions[0].auctionTitle);
            onChange(sortedOptions[0].auctionTitle);
            setInitialized(true); // Set the initialized flag
          }
        } else {
          console.error("Failed to fetch auctions:", res_data.message);
        }
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    getAllAuctions();
  }, [preselected, onChange, initialized]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="sort-by-container d-flex justify-content-end">
      <select value={selectedOption} onChange={handleOptionChange}>
        {options
          .filter(option => option.statusText !== "Completed")
          .map((option) => (
            <option key={option._id} value={option.auctionTitle}>
              {option.auctionTitle}
            </option>
          ))}
      </select>
    </div>
  );

};

export default SortByDropdown;
