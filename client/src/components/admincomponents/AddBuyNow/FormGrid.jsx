const FormGrid = ({ fields }) => {
  return (
    <div className="form-grid">
      {fields?.map(({ id, label, type, placeholder, options }, idx) => (
        <div className="input-container" key={idx}>
          {/* Render input field for type 'text' */}
          {type === "text" && (
            <input id={id} placeholder={placeholder} type="text" />
          )}
          {type === "textarea" && (
            <textarea  id={id} placeholder={placeholder}></textarea>
          )}

          {/* Render select dropdown for type 'select' */}
          {type === "select" && (
            <select id={id}>
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