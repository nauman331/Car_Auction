import React, { useState } from "react";
import "../../assets/stylesheets/verificationform.scss";
import img1 from "../../assets/images/Logo.svg";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { useNavigate } from "react-router-dom";

const Verificationform = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtp = async () => {
    try {
      const response = await fetch(`${backendURL}/user/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const res_data = await response.json();
      if (response.ok) {
        setIsOtpSent(true);
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while Sending OTP!");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${backendURL}/user/verify-reset-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: otp }),
      });
      const res_data = await response.json();
      if (response.ok) {
        setIsOtpValid(true);
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error While verifying");
    }
  };

  const updatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Password & Confirm Passwords not matching");
        return;
      }
      const response = await fetch(`${backendURL}/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: otp, password: newPassword }),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        navigate("/");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error While Updating Password");
    }
  };

  return (
    <div className="otp-container">
      {!isOtpValid ? (
        <>
          <img src={img1} />
          <h2>Reset Password</h2>
          <div className="wrapper--input input--email">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
            <label>Email</label>
          </div>
          {/* <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
          </div> */}
          {isOtpSent && (
            <div className="wrapper--input">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label>Enter the OTP</label>
            </div>
          )}
          {/*otp <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div> */}
          <button
            className="send-otp-btn"
            onClick={isOtpSent ? verifyOtp : sendOtp}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <img src={img1} />
          <h2>Set New Password</h2>
          <div className="wrapper--input">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {/* <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div> */}
          <div className="wrapper--input">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
          {/* <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div> */}
          <button className="update-password-btn" onClick={updatePassword}>
            Update Password
          </button>
        </>
      )}
    </div>
  );
};

export default Verificationform;
