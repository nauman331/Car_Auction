// import React, { useState } from "react";
// import { Search, User, Phone, ChevronDown } from "lucide-react";
// import "../../assets/stylesheets/header.scss";
// import img2 from "../../assets/images/boxcars.png";

// const Header = () => {
//   // State to track which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   return (
//     <div className="heading">
//       <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <img src={img2} alt="Boxcars Logo" />
//           </div>
//           <div className="search-bar">
//             <button className="search-button">
//               <Search size={16} />
//             </button>
//             <input
//               type="text"
//               placeholder="Search Cars or Add ID?"
//               className="search-input"
//             />
//           </div>
//           <nav className="nav-links">
//             <ul>
//               <li>
//                 <a href="/">Home</a>
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("inventory")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/inventory">Inventory</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "inventory" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/inventory/new">New Cars</a>
//                     </li>
//                     <li>
//                       <a href="/inventory/used">Used Cars</a>
//                     </li>
//                     <li>
//                       <a href="/inventory/suvs">SUVs</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("blog")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/blog">Blog</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "blog" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/blog/news">News</a>
//                     </li>
//                     <li>
//                       <a href="/blog/reviews">Reviews</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("shop")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/shop">Shop</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "shop" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/shop/accessories">Accessories</a>
//                     </li>
//                     <li>
//                       <a href="/shop/parts">Parts</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("pages")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/pages">Pages</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "pages" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/pages/about">About Us</a>
//                     </li>
//                     <li>
//                       <a href="/pages/contact">Contact Us</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <a href="/contact">Contact</a>
//               </li>
//             </ul>
//           </nav>
//           <div className="header-actions">
//             <a href="tel:+75960044042" className="phone">
//               <Phone size={16} /> +75 960 044 042
//             </a>
//             <a href="/login" className="sign-in">
//               <User size={16} /> Sign In
//             </a>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
// import React, { useState } from "react";
// import { Search, User, Phone, ChevronDown, Menu } from "lucide-react";
// import "../../assets/stylesheets/header.scss";
// import img2 from "../../assets/images/boxcars.png";

// const Header = () => {
//   // State to track which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="heading">
//       <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <img src={img2} alt="Boxcars Logo" />
//           </div>
//           <div className="search-bar">
//             <button className="search-button">
//               <Search size={16} />
//             </button>
//             <input
//               type="text"
//               placeholder="Search Cars or Add ID?"
//               className="search-input"
//             />
//           </div>
//           <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
//             <ul>
//               <li>
//                 <a href="/">Home</a>
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("inventory")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/inventory">Inventory</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "inventory" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/inventory/new">New Cars</a>
//                     </li>
//                     <li>
//                       <a href="/inventory/used">Used Cars</a>
//                     </li>
//                     <li>
//                       <a href="/inventory/suvs">SUVs</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("blog")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/blog">Blog</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "blog" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/blog/news">News</a>
//                     </li>
//                     <li>
//                       <a href="/blog/reviews">Reviews</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("shop")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/shop">Shop</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "shop" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/shop/accessories">Accessories</a>
//                     </li>
//                     <li>
//                       <a href="/shop/parts">Parts</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li
//                 className="dropdown"
//                 onMouseEnter={() => toggleDropdown("pages")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <a href="/pages">Pages</a>
//                 <ChevronDown size={16} className="dropdown-icon" />
//                 {openDropdown === "pages" && (
//                   <ul className="dropdown-menu">
//                     <li>
//                       <a href="/pages/about">About Us</a>
//                     </li>
//                     <li>
//                       <a href="/pages/contact">Contact Us</a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <a href="/contact">Contact</a>
//               </li>
//             </ul>
//           </nav>
//           <div className="header-actions">
//             <a href="tel:+75960044042" className="phone">
//               <Phone size={16} /> +75 960 044 042
//             </a>
//             <a href="/login" className="sign-in">
//               <User size={16} /> Sign In
//             </a>
//             <button className="menu-icon" onClick={toggleMobileMenu}>
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import "../../assets/stylesheets/header.scss";
import img1 from "../../assets/images/boxcars.png";
import img2 from "../../assets/images/search.png";
import img3 from "../../assets/images/arrow-downwhite.png";
import img4 from "../../assets/images/phone.png";
import img5 from "../../assets/images/user.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <div className="header-section ">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={img1} />
          </a>
          <div className="search-bar-sections">
            <img src={img2} />
            <input
              type="text"
              placeholder="Search Cars or Add ID?"
              className="search-input"
            />
          </div>
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
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
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
                  Inventory
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
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
                  Blog
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
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
                  Pages
                  <img src={img3} />
                </a>

                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Contact
                </a>
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
