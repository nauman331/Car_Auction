import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";
import "../../assets/stylesheets/admin/category.scss";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(false);
    }
  }, [categories]);

  return (
    <div className="category-management-page">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="category-boxes">
          <h3 className="page-title">Categories</h3>
          <div className="category-list">
            {categories.map((category, index) => (
              <div key={index} className="category-box">
                <h5 className="category-name">{category.name}</h5>
                <div className="category-items">
                  {category.items && category.items.length > 0 ? (
                    category.items.map((item, idx) => (
                      <div key={idx} className="category-item">
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="no-items">No items available</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
