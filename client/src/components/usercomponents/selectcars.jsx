import React, { useState } from "react";
import "../../assets/stylesheets/selectcar.scss";

function SearchBar() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(
      `Searching for make: ${selectedMake}, model: ${selectedModel}, price: ${selectedPrice}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-section">
        <div className="search-bar">
          <select
            value={selectedMake}
            onChange={handleMakeChange}
            className="custom-select "
          >
            <option value="">Any Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
          </select>

          <select value={selectedModel} onChange={handleModelChange}>
            <option value="">Any Model</option>
          </select>

          <select value={selectedPrice} onChange={handlePriceChange}>
            <option value="">Any Price</option>
            <option value="10000">Below $10,000</option>
            <option value="20000">Below $20,000</option>
          </select>

          <button type="submit">Search Car</button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
// import React, { useState } from "react";
// import Select from "react-select";
// import "../../assets/stylesheets/selectcar.scss";

// // Custom styles for react-select
// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: "transparent",
//     // border: "2px solid #007bff",
//     borderRadius: "5px",
//     padding: "5px",
//     boxShadow: "none",
//     fontSize: "16px",
//     color: "white",
//     cursor: "pointer",
//     // "&:hover": {
//     //   borderColor: "red",
//     // },
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected
//       ? // ? "red"
//         // : state.isFocused
//         "yellow"
//       : "#ffffff",
//     backgroundColor: state.isSelected || state.isFocused ? "red" : "#fffff",
//     padding: "10px",
//     cursor: "pointer",
//   }),
//   // menu: (provided) => ({
//   //   ...provided,
//   //   borderRadius: "5px",
//   // }),
// };

// function SearchBar() {
//   const [selectedMake, setSelectedMake] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");

//   const handleMakeChange = (selectedOption) => {
//     setSelectedMake(selectedOption ? selectedOption.value : "");
//   };

//   const handleModelChange = (selectedOption) => {
//     setSelectedModel(selectedOption ? selectedOption.value : "");
//   };

//   const handlePriceChange = (selectedOption) => {
//     setSelectedPrice(selectedOption ? selectedOption.value : "");
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     console.log(
//       `Searching for make: ${selectedMake}, model: ${selectedModel}, price: ${selectedPrice}`
//     );
//   };

//   // Options for the dropdowns
//   const makeOptions = [
//     { value: "", label: "Any Make" },
//     { value: "Toyota", label: "Toyota" },
//     { value: "Honda", label: "Honda" },
//   ];

//   const modelOptions = [
//     { value: "", label: "Any Model" },
//     { value: "Corolla", label: "Corolla" },
//     { value: "Civic", label: "Civic" },
//   ];

//   const priceOptions = [
//     { value: "", label: "Any Price" },
//     { value: "10000", label: "Below $10,000" },
//     { value: "20000", label: "Below $20,000" },
//   ];

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="search-section">
//         <div className="search-bar">
//           <Select
//             options={makeOptions}
//             value={makeOptions.find((option) => option.value === selectedMake)}
//             onChange={handleMakeChange}
//             styles={customStyles}
//             placeholder="Any Make"
//           />

//           <Select
//             options={modelOptions}
//             value={modelOptions.find(
//               (option) => option.value === selectedModel
//             )}
//             onChange={handleModelChange}
//             styles={customStyles}
//             placeholder="Any Model"
//           />

//           <Select
//             options={priceOptions}
//             value={priceOptions.find(
//               (option) => option.value === selectedPrice
//             )}
//             onChange={handlePriceChange}
//             styles={customStyles}
//             placeholder="Any Price"
//           />

//           <button type="submit">Search Car</button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default SearchBar;
