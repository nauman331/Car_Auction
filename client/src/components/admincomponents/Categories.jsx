import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/category.scss";
import { X } from "lucide-react";
import { backendURL } from "../../utils/Exports";
import { useSelector } from "react-redux";

// Categories array to handle all category types and API endpoints
const categories = [
  { name: "Vehicle Types", apiKey: "vehicle-type", displayKey: "vehicleType" },
  { name: "Vehicle Makes", apiKey: "vehicle-make", displayKey: "vehicleMake" },
  { name: "Vehicle Models", apiKey: "vehicle-modal", displayKey: "vehicleModal" },
  { name: "Vehicle Years", apiKey: "vehicle-year", displayKey: "vehicleYear" },
  { name: "Drive Types", apiKey: "drive-type", displayKey: "driveType" },
  { name: "Vehicle Transmission", apiKey: "vehicle-transmission", displayKey: "vehicleTransmission" },
  { name: "Vehicle Fuel Types", apiKey: "vehicle-fuel-type", displayKey: "vehicleFuelType" },
  { name: "Vehicle Cylinders", apiKey: "vehicle-cylinder", displayKey: "vehicleCylinder" },
  { name: "Vehicle Engine Sizes", apiKey: "vehicle-engine-size", displayKey: "vehicleEngineSize" },
  { name: "Vehicle Colors", apiKey: "vehicle-color", displayKey: "vehicleColors" },
  { name: "Vehicle Damages", apiKey: "vehicle-damage", displayKey: "vehicleDamage" },
  { name: "Auction Locations", apiKey: "auction-location", displayKey: "auctionLocation" },
];

const CategoryManagement = () => {
  const { token } = useSelector((state) => state.auth); // Get the user's token from Redux store
  const [categoryData, setCategoryData] = useState({}); // Holds category data with input and items

  useEffect(() => {
    // Fetch all categories' items from the backend
    const fetchCategories = async () => {
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

      // Fetch data for each category
      await Promise.all(
        categories.map(async (category) => {
          try {
            const response = await fetch(`${backendURL}/${category.apiKey}`, { headers });
            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            console.log(data)
            setCategoryData((prev) => ({
              ...prev,
              [category.apiKey]: { input: "", items: data },
            }));
          } catch (error) {
            console.error(error);
          }
        })
      );
    };

    fetchCategories();
  }, [token]);

  const handleInputChange = (apiKey, value) => {
    setCategoryData((prev) => ({
      ...prev,
      [apiKey]: { ...prev[apiKey], input: value },
    }));
  };

  const handleAddItem = async (apiKey) => {
    const inputValue = categoryData[apiKey]?.input;
    if (!inputValue) return alert("Input cannot be empty!");

    const categoryKey = apiKey.replace(/-(.)/g, (match, p1) => p1.toUpperCase()); // Convert to camelCase

    try {
      const response = await fetch(`${backendURL}/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ [categoryKey]: inputValue }),
      });

      if (!response.ok) throw new Error("Failed to add item");

      const newItem = await response.json();
      setCategoryData((prev) => ({
        ...prev,
        [apiKey]: { input: "", items: [...prev[apiKey].items, newItem] },
      }));
    } catch (error) {
      console.error(error);
      alert("Error adding item. Please try again.");
    }
  };

  const handleDeleteItem = async (apiKey, id) => {
    try {
      const response = await fetch(`${backendURL}/${apiKey}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete item");

      setCategoryData((prev) => ({
        ...prev,
        [apiKey]: { ...prev[apiKey], items: prev[apiKey].items.filter((item) => item.id !== id) },
      }));
    } catch (error) {
      console.error(error);
      alert("Error deleting item. Please try again.");
    }
  };

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Categories Management</h3>
          <small>Fill the form Categories Details Below</small>
        </span>
      </div>
      <div className="form-container">
        <div className="form-section">
          <div className="category-boxes">
            {categories.map(({ name, apiKey, displayKey }, index) => (
              <div className="category-box" key={index}>
                <h5>{name}</h5>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder={name}
                    value={categoryData[apiKey]?.input || ""}
                    onChange={(e) => handleInputChange(apiKey, e.target.value)}
                  />
                  <label htmlFor={`category-${index}`}>{name}</label>
                  <button type="button" onClick={() => handleAddItem(apiKey)}>Add</button>
                </div>
                {categoryData[apiKey]?.items?.map((item) => (
                  <h6 key={item._id}>
                    {item[displayKey] || "Item not available"}
                    <span onClick={() => handleDeleteItem(apiKey, item._id)}>
                      <X />
                    </span>
                  </h6>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;
