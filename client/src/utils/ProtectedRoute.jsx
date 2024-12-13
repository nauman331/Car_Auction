import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userdata } = useSelector((state) => state.auth);
  const { pathname } = location;

  useEffect(() => {
    // Case 1: User is already authenticated and trying to access /auth or /resetpassword
    if (token && (pathname === "/auth" || pathname === "/resetpassword")) {
      navigate("/", { replace: true });
      toast("User already authenticated");
    } 
    // Case 2: User is not an admin or superadmin trying to access /admin routes
    else if (
      userdata && 
      (userdata.role !== "admin" && userdata.role !== "superadmin") &&
      pathname.startsWith("/admin")
    ) {
      navigate("/", { replace: true });
      toast.error("Access Denied");
    } 
    // Case 3: Admin or Superadmin trying to access non-admin routes
    else if (
      userdata &&
      (userdata.role === "superadmin" || userdata.role === "admin") &&
      !pathname.startsWith("/admin")
    ) {
      navigate("/admin/dashboard", { replace: true });
    } 
    // Case 4: User is not logged in and trying to access /admin routes
    else if (token === null && pathname.startsWith("/admin")) {
      navigate("/auth", { replace: true });
      toast.error("Login first");
    }
  }, [token, userdata, pathname, navigate]);

  return children;
};

export default ProtectedRoute;
