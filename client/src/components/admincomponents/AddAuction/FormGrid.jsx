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
        <div className="input-container" key={idx}>
          {type === "text" && (
            <input
              id={id}
              placeholder={placeholder}
              type="text"
              value={formData[id] || ""}
              onChange={handleChange}
            />
          )}
          {type === "textarea" && (
            <textarea
              id={id}
              placeholder={placeholder}
              value={formData[id] || ""}
              onChange={handleChange}
            ></textarea>
          )}
          {type === "select" && (
            <select
              id={id}
              value={formData[id] || ""}
              onChange={handleChange}
            >
              {options?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default FormGrid;
