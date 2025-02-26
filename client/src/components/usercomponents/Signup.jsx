import React, { useState } from "react";
import "../../assets/stylesheets/login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { backendURL } from "../../utils/Exports";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+971"); // Initialize with UAE country code
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "+971", // Initialize with UAE country code
    address: "",
    role: "buyer",
  });
  const [phoneTouched, setPhoneTouched] = useState(false); // Track if phone input has been interacted with

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    const newValue = value || "+971"; // Fallback to default if value is undefined/null
    setPhone(newValue);
    setUser({
      ...user,
      contact: newValue,
    });
    setPhoneTouched(true); // Mark phone input as touched
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before submission
    if (!phone || typeof phone !== "string" || !isValidPhoneNumber(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        navigate("/verifyotp", { state: { email: user.email } });
      } else {
        toast.error(
          res_data?.errors?.[0]?.msg ||
            res_data?.message ||
            "Unknown error occurred."
        );
      }
    } catch (error) {
      toast.error("Error in registering a new user");
    } finally {
      setLoading(false);
    }
  };

  // Check if the phone number is valid
  const isPhoneValid =
    phone && typeof phone === "string" && isValidPhoneNumber(phone);

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* First Name Input */}
        <div className="wrapper--input">
          <input
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
            name="firstName"
            required
          />
          <label>First Name</label>
        </div>

        {/* Last Name Input */}
        <div className="wrapper--input">
          <input
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
            name="lastName"
            required
          />
          <label>Last Name</label>
        </div>

        {/* Email Input */}
        <div className="wrapper--input input--email">
          <input
            type="email"
            autoComplete="off"
            name="email"
            required
            onChange={handleInputChange}
          />
          <label>Email</label>
        </div>

        {/* Password Input */}
        <div className="wrapper--input">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            style={{
              position: "relative",
            }}
            name="password"
            onChange={handleInputChange}
            required
          />
          <label>Password</label>
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "65%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888",
            }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {/* Phone Input */}
        <div className="wrapper--input">
          <PhoneInput
            value={phone} // Controlled by the `phone` state
            onChange={handlePhoneChange}
            defaultCountry="AE" // United Arab Emirates country code
            international
            withCountryCallingCode
            required
          />
          <label
            style={{
              left: "45px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Phone
            {phoneTouched && !isPhoneValid ? (
              <span
                style={{
                  color: "red",
                  fontSize: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                (Not Valid Phone)
              </span>
            ) : (
              <span
                style={{
                  color: "green",
                  fontSize: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                (Valid Phone)
              </span>
            )}
          </label>
        </div>

        {/* Address Input */}
        <div className="wrapper--input">
          <input
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
            name="address"
          />
          <label>Address</label>
        </div>

        {/* Privacy Policy Checkbox */}
        <label className="privacy-policy">
          <input type="checkbox" required /> I accept the privacy policy
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isPhoneValid} // Disable if loading or phone is invalid
          style={{ backgroundColor: loading ? "gray" : "#050b20" }}
        >
          {loading ? "Registering..." : "Register"}
          <FontAwesomeIcon
            icon={faArrowLeft}
            transform="rotate-140"
            className="login-icon"
          />
        </button>
      </form>
    </>
  );
};

export default Signup;
