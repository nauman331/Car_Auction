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
                value={formData[id] ? dayjs(formData[id]) : null}
                onChange={(value) => handleDateChange(value, id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id={id}
                    className="date-picker-input"
                    sx={{
                      height: "4rem",
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                )}
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "time" && (
            <>
              <MobileTimePicker
                value={formData[id] ? dayjs(formData[id], "hh:mm A") : null}
                onChange={(value) => handleTimeChange(value, id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id={id}
                    className="time-picker-input"
                    sx={{
                      height: "4rem",
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                )}
              />
              <label htmlFor={id}>{label}</label>
            </>
          )}
          {type === "select" && (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormGrid;
