import "../../assets/stylesheets/login.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast"
import { backendURL } from "../../utils/Exports";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../store/slices/authSlice"
import {useNavigate, NavLink} from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    }
  };
  
   const getUserData = async () => {
      const authorizationToken = `Bearer ${token}`;
      try {
        if (!token) {
          console.log("User not logged in");
          return;
        }
        const response = await fetch(`${backendURL}/user/`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        });
        const res_data = await response.json();
        if (response.ok) {
          console.log(res_data)
          dispatch(setUser({ userdata: res_data }));
        } else {
          console.warn("Error in getting user data");
        }
      } catch (error) {
        console.log("Error in fetching user data", error);
      }
    };

     // Fetch user data if token is available
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="wrapper--input input--email">
        <input type="email" autoComplete="off" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email" required />

        <label>Email</label>
      </div>
      <div className="wrapper--input">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
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
      <button type="submit" className="btn-primary">
        Login{" "}
        <FontAwesomeIcon
          icon={faArrowLeft}
          transform="rotate-140"
          className="login-icon"
        />
      </button>
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

export default Login;
