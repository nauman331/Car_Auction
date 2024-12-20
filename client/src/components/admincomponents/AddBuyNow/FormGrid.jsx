import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const FormGrid = ({ fields, formData, setFormData }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: date,
    }));
  };

  const handleSelectChange = (selectedOption, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: selectedOption?.value || "",
    }));
  };

  return (
    <div className="form-grid">
      {fields?.map(({ id, label, type, placeholder, options }, idx) => (
        <div className="input-container" key={idx}>
          {(type === "text" || type === "number") && (
            <>
              <input
                id={id}
                placeholder={placeholder}
                type={type}
                value={formData[id] || ""}
                onChange={handleChange}
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "textarea" && (
            <>
              <textarea
                id={id}
                placeholder={placeholder}
                value={formData[id] || ""}
                onChange={handleChange}
              ></textarea>
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "date" && (
            <>
              <DatePicker
                id={id}
                selected={formData[id] || null}
                onChange={(date) => handleDateChange(date, id)}
                placeholderText="Enter Date"
                dateFormat="yyyy-MM-dd"
                className="date-picker"
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "time" && (
            <>
              <DatePicker
                id={id}
                selected={formData[id] || null}
                onChange={(time) => handleDateChange(time, id)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm aa"
                placeholderText={placeholder}
                className="time-picker"
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "select" && (
            <>
              <Select
                id={id}
                options={options}
                value={options.find((option) => option.value === formData[id]) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, id)}
                placeholder={placeholder}
                className="react-select-container"
                classNamePrefix="react-select"
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormGrid;
