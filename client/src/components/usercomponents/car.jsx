// import React from "react";
// import "../../assets/stylesheets/car.scss";

// import img from "../../assets/images/right-up 1 (3).png";
// function CarSection() {
//   const sections = [
//     {
//       title: "Are You Looking For a Car?",
//       description:
//         "Create an account to start exploring thousands of cars. Find your perfect match easily and also get access to exclusive deals.",
//       button: "Get Started",
//     },
//     {
//       title: "Do You Want to Sell a Car?",
//       description:
//         "Sign up now to list your car and reach potential buyers instantly. Selling your car has never been this simple.",
//       button: "Get Started",
//     },
//   ];

//   return (
//     <div className="car-section container-carsection">
//       <div className="row">
//         {sections.map((section, index) => (
//           <div
//             className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4"
//             key={index}
//           >
//             <div className="section p-3">
//               <div className="loooking-text">
//                 <h2>{section.title}</h2>
//                 <p>{section.description}</p>
//                 <div className="btn">
//                   <a href="#">
//                     {section.button}
//                     <img src={img} />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CarSection;

import React from "react";
import "../../assets/stylesheets/car.scss";

import img from "../../assets/images/right-up 1 (3).png";
import img1 from "../../assets/images/are-you-looking-for a car.jpg";
import img3 from "../../assets/images/sellacar.jpg";

function CarSection() {
  const sections = [
    {
      title: "Are You Looking For a Car?",
      description:
        "Create an account to start exploring thousands of cars. Find your perfect match easily and also get access to exclusive deals.",
      button: "Get Started",
      backgroundImage: img1,
    },
    {
      title: "Do You Want to Sell a Car?",
      description:
        "Sign up now to list your car and reach potential buyers instantly. Selling your car has never been this simple.",
      button: "Get Started",
      backgroundImage: img3,
    },
  ];

  return (
    <div className="car-section container-carsection">
      <div className="row">
        {sections.map((section, index) => (
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4"
            key={index}
          >
            <div
              className="section p-3"
              style={{
                backgroundImage: `url(${section.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "350px",
                borderRadius: "20px",
              }}
            >
              <div className="loooking-text">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="btn">
                  <a href="#">
                    {section.button}
                    <img src={img} alt="icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarSection;
