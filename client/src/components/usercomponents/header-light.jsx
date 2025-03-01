import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/header-light.scss";
import img1 from "../../assets/images/project logo light (1).svg";
import img3 from "../../assets/images/arrow-downwhite.png";
import img4 from "../../assets/images/phone.png";
import img5 from "../../assets/images/user.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { backendURL } from "../../utils/Exports";

const Header = () => {
  const { token, userdata } = useSelector((state) => state.auth);
  const [currentCar, setCurrentCar] = useState();

  const getCurrentCar = async () => {
    try {
      const response = await fetch(`${backendURL}/auction/active-car`, {
        method: "GET",
      });
      const res_data = await response.json(); // Wait for JSON data
      if (response.ok) {
        setCurrentCar(res_data);
      } else {
        console.log(res_data.message || "Failed to fetch the current car.");
      }
    } catch (error) {
      console.log("Error in getting the current car:", error);
    }
  };

  useEffect(() => {
    getCurrentCar();
  }, []);

  return (
    <div className="header-sections">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={img1} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa-solid fa-bars"></i>
            </span>
          </button>

          <div
            className="collapse navbar-collapse"
            style={{ justifyContent: "right", width: "100%" }}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li class="nav-item dropdown">
                <NavLink
                  class="nav-link "
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Vehicles
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      class="dropdown-item"
                      to="/auction-vehicle"
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",
                        color: "black",
                      }}
                    >
                      Auction Vehicles
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      class="dropdown-item"
                      to="/buynow-vehicle"
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",
                        color: "black",
                      }}
                    >
                      Buy Now Vehicles
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Auctions
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      class="dropdown-item"
                      to="/auction-events"
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",
                        color: "black",
                      }}
                    >
                      Auction Events
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={
                        currentCar && currentCar._id
                          ? `/auctioncar/${currentCar._id}`
                          : "/auction-vehicle"
                      }
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",
                        color: "black",
                      }}
                    >
                      Live Auction
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                  <img src={img3} />
                </a>

                <ul class=" dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      class="dropdown-item"
                      to="/about-us"
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",
                        color: "black",
                      }}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      class="dropdown-item"
                      to="/contact-us"
                      style={{
                        textDecoration: "none",
                        marginLeft: "1rem",

                        color: "black",
                      }}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="header-actions">
              <a href="tel:+75960044042" className="phone">
                <img src={img4} /> +971 509496511
              </a>

              {token ? (
                userdata?.role === "admin" ||
                  userdata?.role === "superadmin" ? (
                  <NavLink to="/admin/profile" className="sign-in">
                    <img
                      src={userdata?.avatarImage}
                      style={{
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    Profile
                  </NavLink>
                ) : (
                  <NavLink to="/user/userprofile" className="sign-in">
                    <img
                      src={userdata?.avatarImage}
                      style={{
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    Profile
                  </NavLink>
                )
              ) : (
                <NavLink to="/auth" className="sign-in">
                  <img src={img5} /> Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
