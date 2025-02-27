import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/withdraw.scss";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { useSelector } from "react-redux";

const WithdrawalForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { balance } = location.state || { balance: 0 };
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    amount: "",
  });

  useEffect(() => {
    if (!balance) {
      navigate("/user/wallet");
    }
  }, [balance, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value, // Convert amount to number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount > balance) {
      toast.error("You can't withdraw more amount than your balance");
      return;
    }

    const authorizationToken = `Bearer ${token}`;
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/wallet/create-withdraw-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Withdrawal request submitted");
        navigate("/user/wallet");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while sending request");
    } finally {
      setLoading(false)
    }
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
          <label>Account Number/IBN Number</label>
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
        <button type="submit" className="submit-button" disabled={loading} style={{ backgroundColor: loading ? "gray" : "#405FF2" }}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
