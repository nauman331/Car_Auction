// import React, { useState } from "react";
// import "../../assets/stylesheets/withdraw.scss"; // CSS styles

// const WithdrawalForm = () => {
//   const [formData, setFormData] = useState({
//     accountHolderName: "",
//     accountNumber: "",
//     bankName: "",
//     ifscCode: "",
//     amount: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Withdrawal request submitted successfully!");
//     console.log("Form Data Submitted:", formData);
//   };

//   return (
//     <div className="form-container">
//       <h2>Withdrawal Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="wrapper--input">
//           <input
//             type="text"
//             name="accountHolderName"
//             value={formData.accountHolderName}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//           <label>Account Holder Name</label>
//         </div>
//         <div className="wrapper--input">
//           <input
//             type="text"
//             name="accountNumber"
//             value={formData.accountNumber}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//           <label>Account Number</label>
//         </div>
//         <div className="wrapper--input">
//           <input
//             type="text"
//             name="bankName"
//             value={formData.bankName}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//           <label>Bank Name</label>
//         </div>
//         <div className="wrapper--input">
//           <input
//             type="text"
//             name="ifscCode"
//             value={formData.ifscCode}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//           <label>IFSC Code</label>
//         </div>
//         <div className="wrapper--input">
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//           <label>Withdrawal Amount</label>
//         </div>
//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WithdrawalForm;
import React, { useState } from "react";
import "../../assets/stylesheets/withdraw.scss";

const WithdrawalForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Withdrawal request submitted!");
  };

  return (
    <div className="form-containers">
      <h2>Withdrawal Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Account Holder Name */}
        <div className="wrapper">
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            required
          />
          <label>Account Holder Name</label>
        </div>

        {/* Account Number */}
        <div className="wrapper">
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
          <label>Account Number</label>
        </div>

        {/* Bank Name */}
        <div className="wrapper">
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
          <label>Bank Name</label>
        </div>

        {/* IFSC Code */}
        {/* <div className="wrapper">
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
          <label>IFSC Code</label>
        </div> */}

        {/* Withdrawal Amount */}
        <div className="wrapper">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <label>Withdrawal Amount</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
