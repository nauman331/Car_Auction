import React, { useState } from "react";
import "../../assets/stylesheets/verification.scss";

const OTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (email) {
      setIsOtpSent(true);
      setError("");
      alert("OTP sent to your email!");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      setIsOtpValid(true);
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const updatePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert("Password updated successfully!");
      setError("");
    } else {
      setError("Passwords do not match or are too short.");
    }
  };

  return (
    <div className="otp-container">
      {!isOtpValid ? (
        <>
          <h2>Reset Password</h2>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
          </div>
          {isOtpSent && (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
          {error && <p>{error}</p>}
          <button
            className="send-otp-btn"
            onClick={isOtpSent ? verifyOtp : sendOtp}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <h2>Set New Password</h2>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          <button className="update-password-btn" onClick={updatePassword}>
            Update Password
          </button>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
