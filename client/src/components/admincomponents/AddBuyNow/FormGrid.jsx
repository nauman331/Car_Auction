import React from "react";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import Select from "react-select";
import { TextField } from "@mui/material";
import dayjs from "dayjs";


const FormGrid = ({ fields, formData, setFormData }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (value, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value ? dayjs(value).format("YYYY-MM-DD") : null, // Format as plain date string
    }));
  };

  const handleTimeChange = (value, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value ? dayjs(value).format("hh:mm A") : "", // Format as 12-hour time string with AM/PM
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
      {fields.length > 0 &&
        fields?.map(({ id, label, type, placeholder, options }, idx) => (
          <>
            {(type === "text" || type === "number") && (
              <div className="input-container" key={idx}>
                <input
                  id={id}
                  placeholder={placeholder}
                  type={type}
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
            {type === "date" && (
              <div className="input-container" key={idx}>
                <DatePicker
                  value={formData[id] ? dayjs(formData[id]) : null}
                  onChange={(value) => handleDateChange(value, id)}
                  className="date-picker-input"
                  InputProps={{
                    disableUnderline: true
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id={id}
                      className="date-picker-field"
                    />
                  )}
                />

                <label htmlFor={id}>{label}</label>
              </div>
            )}
            {type === "time" && (
              <div className="input-container" key={idx}>
                <MobileTimePicker
                  value={formData[id] ? dayjs(formData[id], "hh:mm A") : null}
                  onChange={(value) => handleTimeChange(value, id)}
                  className="time-picker-input"
                  renderInput={(params) => <TextField {...params} id={id} />}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            )}
            {type === "select" && (
              <div className="input-container" key={idx}>
                <Select
                  id={id}
                  options={options}
                  value={
                    options.find((option) => option.value === formData[id]) ||
                    null
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, id)
                  }
                  placeholder={placeholder}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <label htmlFor={id}>{label}</label>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default FormGrid;
