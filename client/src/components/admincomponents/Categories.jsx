import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";
import "../../assets/stylesheets/admin/category.scss";
import { X } from "lucide-react";
import { backendURL, categories } from "../../utils/Exports";
import { setCategories } from "../../store/slices/categorySlice";
import toast from "react-hot-toast";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const fetchData = async ({ key }) => {
        const res = await fetch(`${backendURL}/${key}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setCategoryData((prev) => ({
            ...prev,
            [key]: { input: "", items: data },
          }));
          dispatch(setCategories({ key, items: data }));
        } else {
          toast.error("Error while getting all categories");
        }
      };
      await Promise.all(categories.map(fetchData));
      setLoading(false);
    };
    fetchCategories();
  }, [token, dispatch]);

  const updateCategoryData = (key, data) =>
    setCategoryData((prev) => ({ ...prev, [key]: { ...prev[key], ...data } }));

  const handleInputChange = (key, value) =>
    updateCategoryData(key, { input: value });

  const handleAddItem = async (key, field) => {
    const input = categoryData[key]?.input;
    if (!input) return toast.error("Input cannot be empty!");

    const res = await fetch(`${backendURL}/${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [field]: input }),
    });

    if (res.ok) {
      const newItem = await res.json();
      updateCategoryData(key, {
        input: "",
        items: [...categoryData[key]?.items, newItem],
      });
    } else {
      alert("Error adding item.");
    }
  };

  const handleDeleteItem = async (key, id) => {
    const res = await fetch(`${backendURL}/${key}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="category-management container">
          <h3>Categories Management</h3>
          <small>Fill the form Categories Details Below</small>
          <div className="category-boxes mt-5">
            {categories.map(({ name, key, field }) => (
              <div className="category-box" key={key}>
                <h5>{name}</h5>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder={name}
                    value={categoryData[key]?.input || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    id={name}
                  />
                  <label htmlFor={name}>Enter {name}</label>
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
      )}
    </>
  );
};

export default CategoryManagement;
