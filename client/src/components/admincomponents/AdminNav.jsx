import { NavLink } from "react-router-dom";
import "../../assets/stylesheets/admin/leftadminnav.scss";
import {
  LayoutDashboard,
  Car,
  CarFront,
  SquareUser,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/authSlice";

const menuItems = [
  { to: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/auctionlistings", icon: <Car />, label: "Auctions Management" },
  { to: "/admin/auctioninventory", icon: <CarFront />, label: "Auction Inventory" },
  { to: "/admin/carlistings", icon: <CarFront />, label: "Buy Now Inventory" },
  { to: "/admin/managecategories", icon: <CarFront />, label: "Category Options" },
  { to: "/admin/orders", icon: <CarFront />, label: "Orders" },
  { to: "/admin/deposits", icon: <CarFront />, label: "Deposits" },
  { to: "/admin/allusers", icon: <CarFront />, label: "Users" },
  { to: "/admin/profile", icon: <SquareUser />, label: "My Profile" },
];

const AdminNav = () => {
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
        <h5>username</h5>
        {open ? (
          <X onClick={() => setOpen(false)} className="toggler" />
        ) : (
          <Menu onClick={() => setOpen(true)} className="toggler" />
        )}
      </header>
      <aside className={open ? "open-adminnav" : "close-adminnav"}>
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
          onClick={() => dispatch(logOut())}
        >
          <LogOut style={{ transform: "rotate(180deg)" }} />
          <span>Log Out</span>
        </small>
      </aside>
    </>
  );
};

export default AdminNav;
