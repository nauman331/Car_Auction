import React from "react";

const FormGrid = ({ fields, formData, setFormData }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="form-grid">
      {fields?.map(({ id, label, type, placeholder, options }, idx) => (
        
        <>
          {type === "text" && (
            <div className="input-container" key={idx}>
            <input
              id={id}
              placeholder={placeholder}
              type="text"
              value={formData[id] || ""}
              onChange={handleChange}
            />
            <label htmlFor={id}>{label}</label>
            </div>
          )}
          {type === "textarea" && (
            <div className="input-container" key={idx}>
            <textarea
              id={id}
              placeholder={placeholder}
              value={formData[id] || ""}
              onChange={handleChange}
            ></textarea>
            <label htmlFor={id}>{label}</label>
            </div>
          )}
          {type === "select" && (
            <div className="input-container" key={idx}>
            <select id={id} value={formData[id] || ""} onChange={handleChange}>
              <option value="">Select {label}</option>
              {options?.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor={id}>{label}</label>
            </div>
          )}

        </>
      ))}
    </div>
  );
};


export default FormGrid;
