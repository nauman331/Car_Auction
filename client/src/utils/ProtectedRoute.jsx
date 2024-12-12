import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, userdata } = useSelector((state) => state.auth);
    const { pathname } = location;

    if(userdata && token) {
    useEffect(() => {
        if (token && (pathname === "/auth" || pathname === "/resetpassword")) {
            navigate("/", { replace: true });
            toast("User already authenticated");
        } else if (
            (userdata.role !== "admin" && userdata.role !== "superadmin") &&
            pathname.startsWith("/admin")
        ) {
            navigate("/", { replace: true });
            toast.error("Access Denied");
        }  else if (
            (userdata.role === "superadmin" || userdata.role === "admin") &&
            !pathname.startsWith("/admin")
        ) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [token, userdata, pathname, navigate]);
}

    return children;
};

export default ProtectedRoute;
