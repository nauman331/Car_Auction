import { NavLink, useNavigate } from "react-router-dom";
import "../../../assets/stylesheets/admin/leftadminnav.scss";
import {
  LayoutDashboard,
  SquareUser,
  LogOut,
  Menu,
  X,
  Wallet,
  ShoppingCart,
  House,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/slices/authSlice";
import img1 from "../../../assets/images/project logo light (1).svg";

const menuItems = [
  { to: "/user/userdashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/user/orders", icon: <ShoppingCart />, label: "Orders" },
  { to: "/user/wallet", icon: <Wallet />, label: "Wallet" },
  { to: "/user/userprofile", icon: <SquareUser />, label: "My Profile" },
];

const UserNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleNavLinkClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      <header className="admin-header">
        <div
          className="logo"
          style={{ height: "3rem", width: "3rrem", marginLeft: "1rem" }}
        >
          <img
            src={img1}
            alt="...logo"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <NavLink to="/" style={{ cursor: "pointer", color: "white" }}>
          <House />
        </NavLink>
        {open ? (
          <X onClick={() => setOpen(false)} className="toggler" />
        ) : (
          <Menu onClick={() => setOpen(true)} className="toggler" />
        )}
      </header>
      <aside className={open ? "oUser" : "close-adminnav"}>
        {menuItems.map(({ to, icon, label }, index) => (
          <NavLink
            to={to}
            className="dash-link"
            key={index}
            onClick={handleNavLinkClick}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
        <small
          className="dash-link"
          onClick={() => {
            dispatch(logOut());
            navigate("/auth");
          }}
        >
          <LogOut style={{ transform: "rotate(180deg)" }} />
          <span>Log Out</span>
        </small>
      </aside>
    </>
  );
};

export default UserNav;
