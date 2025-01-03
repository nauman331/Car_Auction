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
    // Redirect if user is authenticated and accessing /auth or /resetpassword
    if (token && userdata && (pathname === "/auth" || pathname === "/resetpassword")) {
        const redirectPath = userdata.role === "superadmin" || userdata.role === "admin" 
          ? "/admin/dashboard" 
          : "/user/userdashboard";
        navigate(redirectPath, { replace: true });
    } 

    // Restrict non-admin users from accessing /admin routes
    if (userdata && pathname.startsWith("/admin")) {
      if (userdata.role !== "admin" && userdata.role !== "superadmin") {
        navigate("/", { replace: true });
        toast.error("Access Denied");
      }
    }

    // Redirect admins to /admin dashboard if they try to access non-admin routes
    if (userdata && (userdata.role === "admin" || userdata.role === "superadmin")) {
      if (!pathname.startsWith("/admin")) {
        navigate("/admin/dashboard", { replace: true });
      }
    }

    // Redirect unauthenticated users trying to access /admin routes to /auth
    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
      navigate("/auth", { replace: true });
    }
  }, [token, userdata, pathname, navigate]);

  // Render children if no redirection occurs
  return children;
};

export default ProtectedRoute;
