// import React from "react";
// import "../../assets/stylesheets/header-light.scss";
// import img1 from "../../assets/images/boxcars.png";
// import img2 from "../../assets/images/search.png";
// import img3 from "../../assets/images/arrow-downwhite.png";
// import img4 from "../../assets/images/phone.png";
// import img5 from "../../assets/images/user.png";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import {useSelector} from "react-redux"
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   const {token} = useSelector((state)=>state.auth)
//   return (
//     <div className="header-sections">
//       <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             <img src={img1} />
//           </a>
//           <div className="search-bar-sections">
//             <img src={img2} />
//             <input
//               type="text"
//               placeholder="Search Cars or Add ID?"
//               className="search-input"
//             />
//           </div>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="/navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon">
//               <i className="fa-solid fa-bars"></i>
//             </span>
//           </button>

//           <div
//             className="collapse navbar-collapse"
//             style={{ justifyContent: "right", width: "100%" }}
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav">
//               <div className="header-actions">
//             <NavLink to="/" className="sign-in">
//                 Home
//               </NavLink>
//               </div>
//               <li class="nav-item dropdown">
//                 <a
//                   class="nav-link "
//                   href="/"
//                   id="navbarDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Inventory
//                   <img src={img3} />
//                 </a>

//                 <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Another action
//                     </a>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li class="nav-item dropdown">
//                 <a
//                   class="nav-link "
//                   href="/"
//                   id="navbarDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Pages
//                   <img src={img3} />
//                 </a>

//                 <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Another action
//                     </a>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="/">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//             <div className="header-actions">
//               <a href="tel:+75960044042" className="phone">
//                 <img src={img4} /> +75 960 044 042
//               </a>
//               {
//                 token ? <NavLink to="/user/userprofile" className="sign-in">
//                 <img src={img5} /> Profile
//               </NavLink>  :  <NavLink to="/auth" className="sign-in">
//                 <img src={img5} /> Sign In
//               </NavLink>
//               }

//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import "../../assets/stylesheets/header-light.scss";
import img1 from "../../assets/images/Logo.svg";

import img3 from "../../assets/images/arrow-downwhite.png";
import img4 from "../../assets/images/phone.png";
import img5 from "../../assets/images/user.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="header-sections">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={img1} />
          </a>
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
                <a
                  class="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Home
                </a>
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
                    <a class="dropdown-item" href="#">
                      Auction Vehicles
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Buy Now Vehicles
                    </a>
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
                    <a class="dropdown-item" href="#">
                      Auction Events
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Live Auction
                    </a>
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

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      AboutUs
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      ContactUs
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="header-actions">
              <a href="tel:+75960044042" className="phone">
                <img src={img4} /> +75 960 044 042
              </a>

              <a href="/login" className="sign-in">
                <img src={img5} /> Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
