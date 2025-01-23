import React, { useState } from "react";
import "../../assets/stylesheets/otp.scss";
import img1 from "../../assets/images/Logo.svg";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { useNavigate, useLocation } from "react-router-dom";

const OTPVerificationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendURL}/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email }),
      });
      const res_data = await response.json();
      if (response.ok) {
        setToken("");
        toast.success(res_data.message);
        navigate("/auth");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while verifying otp");
    }
  };

  return (
    <div className="center">
      <div className="container">
        <img src={img1} />
        <h2>OTP Verification</h2>
        <form onSubmit={handleVerify} className="form">
          <label className="label">Enter the OTP sent to {email}:</label>
          <div className="wrapper--input">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              name="token"
              placeholder="Enter the OTP"
              // className="input"
            />
            <label>OTP</label>
          </div>
          {/* <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            name="token"
            className="input"
          /> */}
          <button type="submit" className="button">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
