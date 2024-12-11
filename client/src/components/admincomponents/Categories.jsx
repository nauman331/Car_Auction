import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/category.scss";
import { X } from "lucide-react";
import { backendURL } from "../../utils/Exports";
import { useSelector } from "react-redux";

const categories = [
  { name: "Vehicle Types", key: "vehicle-type", field: "vehicleType" },
  { name: "Vehicle Makes", key: "vehicle-make", field: "vehicleMake" },
  { name: "Vehicle Models", key: "vehicle-modal", field: "vehicleModal" },
  { name: "Vehicle Years", key: "vehicle-year", field: "vehicleYear" },
  { name: "Drive Types", key: "drive-type", field: "driveType" },
  { name: "Vehicle Transmission", key: "vehicle-transmission", field: "vehicleTransimission" },
  { name: "Vehicle Fuel Types", key: "vehicle-fuel-type", field: "vehicleFuelTypes" },
  { name: "Vehicle Cylinders", key: "vehicle-cylinder", field: "vehicleCylinders" },
  { name: "Vehicle Engine Sizes", key: "vehicle-engine-size", field: "vehicleEngineSize" },
  { name: "Vehicle Colors", key: "vehicle-color", field: "vehicleColors" },
  { name: "Vehicle Damages", key: "vehicle-damage", field: "vehicleDamage" },
  { name: "Auction Locations", key: "auction-location", field: "auctionLocation" },
];

const CategoryManagement = () => {
  const { token } = useSelector((state) => state.auth);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const fetchData = async ({ key }) => {
        const res = await fetch(`${backendURL}/${key}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setCategoryData((prev) => ({ ...prev, [key]: { input: "", items: data } }));
        }
      };
      await Promise.all(categories.map(fetchData));
    };
    fetchCategories();
  }, [token]);

  const updateCategoryData = (key, data) =>
    setCategoryData((prev) => ({ ...prev, [key]: { ...prev[key], ...data } }));

  const handleInputChange = (key, value) => updateCategoryData(key, { input: value });

  const handleAddItem = async (key, field) => {
    const input = categoryData[key]?.input;
    if (!input) return alert("Input cannot be empty!");
    const res = await fetch(`${backendURL}/${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [field]: input }),
    });
    if (res.ok) {
      const newItem = await res.json();
      updateCategoryData(key, { input: "", items: [...categoryData[key]?.items, newItem] });
    } else {
      alert("Error adding item.");
    }
  };

  const handleDeleteItem = async (key, id) => {
    const res = await fetch(`${backendURL}/${key}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      updateCategoryData(key, {
        items: categoryData[key]?.items.filter((item) => item._id !== id),
      });
    } else {
      alert("Error deleting item.");
    }
  };

  return (
    <div className="category-management">
      <h3>Categories Management</h3>
      <small>Fill the form Categories Details Below</small>
      <div className="category-boxes">
        {categories.map(({ name, key, field }) => (
          <div className="category-box" key={key}>
            <h5>{name}</h5>
            <div className="input-container">
              <input
                type="text"
                placeholder={name}
                value={categoryData[key]?.input || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
              <button onClick={() => handleAddItem(key, field)}>Add</button>
            </div>
            {categoryData[key]?.items?.map((item) => (
              <h6 key={item._id}>
                {item[field] || "Item not available"}
                <span onClick={() => handleDeleteItem(key, item._id)}>
                  <X />
                </span>
              </h6>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
