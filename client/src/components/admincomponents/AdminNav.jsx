import { NavLink } from "react-router-dom";
import "../../assets/stylesheets/admin/leftadminnav.scss";
import img2 from "../../assets/images/project logo light (1).svg"
import {
  LayoutDashboard,
  Car,
  CarFront,
  SquareUser,
  LogOut,
  Menu,
  X,
  ListTodo,
  ShoppingCart,
  Wallet,
  Users,
  Gavel,
  HandCoins,
  House,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/authSlice";

const menuItems = [
  { to: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/auctionlistings", icon: <Gavel />, label: "Auctions Management" },
  { to: "/admin/auctioninventory", icon: <CarFront />, label: "Auction Inventory" },
  { to: "/admin/carlistings", icon: <Car />, label: "Buy Now Inventory" },
  { to: "/admin/managecategories", icon: <ListTodo />, label: "Category Options" },
  { to: "/admin/orders", icon: <ShoppingCart />, label: "Orders" },
  { to: "/admin/deposits", icon: <Wallet />, label: "Deposits" },
  { to: "/admin/withdrawals", icon: <HandCoins />, label: "Withdrawals" },
  { to: "/admin/allusers", icon: <Users />, label: "Users" },
  { to: "/admin/profile", icon: <SquareUser />, label: "My Profile" },
];

const AdminNav = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1350);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1350);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavLinkClick = () => {
    if (open && isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      <header className="admin-header">
        <div
          className="logo"
          style={{
            height: "3rem",
            width: "3rem",
            marginLeft: "1rem",
          }}
        >
          <img
            src={img2}
            alt="...logo"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        {isMobile ? (
          open ? <X onClick={() => setOpen(false)} className="toggler" /> : <Menu onClick={() => setOpen(true)} className="toggler" />
        ) : (
          <NavLink to="/" className="home-icon">
            <House />
          </NavLink>
        )}
      </header>
      <aside className={open ? "open-adminnav" : "close-adminnav"}>
        {menuItems.map(({ to, icon, label }, index) => (
          <NavLink to={to} className="dash-link" key={index} onClick={handleNavLinkClick}>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
        <small className="dash-link" onClick={() => dispatch(logOut())}>
          <LogOut style={{ transform: "rotate(180deg)" }} />
          <span>Log Out</span>
        </small>

        {isMobile && (
          <NavLink to="/" className="dash-link" onClick={handleNavLinkClick}>
            <House />
            <span>Back to Home</span>
          </NavLink>
        )}
      </aside>
    </>
  );
};

export default AdminNav;
