import "../../assets/stylesheets/login.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { NavLink } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User Logged In Successfully!");
        dispatch(setToken({ token: res_data.token }));
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while Logging In");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="wrapper--input input--email">
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />

          <label>Email</label>
        </div>
        <div className="wrapper--input">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              position: "relative",
            }}
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

        <div className="options">
          <label>
            <input type="checkbox" /> Remember
          </label>
          <NavLink to="/resetpassword">Forgotten password?</NavLink>
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ backgroundColor: loading ? "gray" : "#050b20" }}>
          {loading ? "Logging In..." : "Log In"}
          <FontAwesomeIcon
            icon={faArrowLeft}
            transform="rotate-140"
            className="login-icon"
          />
        </button>
      </form>
    </div>
  );
};

export default Login;
