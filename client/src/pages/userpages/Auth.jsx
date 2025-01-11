import React, { useState } from "react";
import Login from "../../components/usercomponents/Login";
import Signup from "../../components/usercomponents/Signup";
import "../../assets/stylesheets/form.scss";
import img1 from "../../assets/images/Logo.svg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="center">
      <div className="auth-container">
        <div className="logo">
          <img src={img1} />
        </div>
        <div className="form-container">
          <div className="form-toggle">
            <button onClick={toggleForm} className={isLogin ? "active" : ""}>
              Sign In
            </button>
            <button onClick={toggleForm} className={!isLogin ? "active" : ""}>
              Register
            </button>
          </div>

          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
