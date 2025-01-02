import React, { useState } from "react";
import "../../assets/stylesheets/login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { backendURL } from "../../utils/Exports";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    role: "buyer"
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
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
        toast.error(res_data?.errors?.[0]?.msg || res_data?.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error("Error in registering a new user");
    }
  };
  

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
      <div className="wrapper--input">
        <input
          type="tel"
          name="contact"
          onChange={handleInputChange}
          required
        />
        <label>Phone</label>
      </div>
      <div className="wrapper--input">
        <input
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          name="address"
          required
        />
        <label>Address</label>
      </div>
      <button type="submit" className="btn-primary">
        Register{" "}
        <FontAwesomeIcon
          icon={faArrowLeft}
          transform="rotate-140"
          className="login-icon"
        />
      </button>
      <label className="privacy-policy">
        <input type="checkbox" required /> I accept the privacy policy
      </label>
      <div className="social-login-section">
        <div className="line-with-text">
          <span>OR</span>
        </div>
        <div className="social-login">
          <button className="btn-facebook">
            <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
            Continue Facebook
          </button>
          <button className="btn-google">
            <FontAwesomeIcon icon={faGoogle} className="google-icon" /> Continue
            Google
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
