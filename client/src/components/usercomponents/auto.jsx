import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/sortbydropdown.scss";
import { backendURL } from "../../utils/Exports";

function SortByDropdown({ onChange }) {
  const [selectedOption, setSelectedOption] = useState(""); // Set to empty initially
  const [options, setOptions] = useState([]);

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        // Combine auctionDate and auctionTime to create a complete Date object
        const sortedOptions = res_data.map((auction) => {
          const { auctionDate, auctionTime } = auction;
          const date = new Date(auctionDate);
          const [hour, minute] = auctionTime.split(":");
          const [ampm] = auctionTime.split(" ").slice(1); // Get AM or PM

          // Adjust the time based on AM/PM
          const adjustedHour = ampm === "PM" && parseInt(hour, 10) !== 12 ? parseInt(hour, 10) + 12 : parseInt(hour, 10);
          date.setHours(adjustedHour, minute);

          return {
            ...auction,
            fullAuctionDate: date,
          };
        });

        // Sort auctions by the combined date in ascending order
        const sortedByDate = sortedOptions.sort((a, b) => a.fullAuctionDate - b.fullAuctionDate);

        setOptions(sortedByDate);

        // Set the first auction as the selected option after sorting
        if (sortedByDate.length > 0) {
          setSelectedOption(sortedByDate[0].auctionTitle); // Select the first auction
          onChange(sortedByDate[0].auctionTitle); // Trigger the filter change
        }
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    }
  };

  useEffect(() => {
    getAllAuctions();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value); // Trigger the filter change
  };

  return (
    <div className="sort-by-container d-flex justify-content-end">
      <label htmlFor="sort-by-select">Auctions:</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option._id} value={option.auctionTitle}>
            {option.auctionTitle}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByDropdown;
