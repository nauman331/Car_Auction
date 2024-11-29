import { NavLink } from "react-router-dom";
import "../../assets/stylesheets/leftadminnav.scss";
import {
  LayoutDashboard,
  PencilRuler,
  ShoppingBag,
  SquarePlus,
  X,
  Menu,
  LogOut,
  Car,
  CarFront,
  Bookmark,
  Search,
  MessagesSquare,
  SquareUser
} from "lucide-react";
import { useState } from "react";

const AdminNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <header className="admin-header">
    <h3>username</h3>
          {open ? <X onClick={(()=>setOpen(false))} className="toggler"/> : <Menu onClick={(()=>setOpen(true))} className="toggler"/>}
    </header>
    <aside className={open ? "open-adminnav" : "close-adminnav"}>
      <NavLink to="/admin/dashboard" className="dash-link">
        <LayoutDashboard />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <Car />
        <span>My Listings</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <CarFront />
        <span>Add Listings</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <Bookmark />
        <span>My Favourites</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <Search />
        <span>Saved Search</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <MessagesSquare />
        <span>Messages</span>
      </NavLink>
      <NavLink to="/admin/" className="dash-link">
      <SquareUser />
        <span>My Profile</span>
      </NavLink>
      <h5 className="dash-link">
        <LogOut style={{transform: "rotate(180deg)"}}/>
        <span>Log Out</span>
      </h5>
    </aside>
    </>
  );
};

export default AdminNav;
