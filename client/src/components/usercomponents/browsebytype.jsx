import React from "react";
import "../../assets/stylesheets/browsebytpye.scss";

import CarCategories from "../usercomponents/browse";
import img1 from "../../assets/images/icon (1).png";
import img2 from "../../assets/images/icon (2).png";
import img3 from "../../assets/images/icon (3).png";
import img4 from "../../assets/images/icon (4).png";
import img5 from "../../assets/images/icon (5).png";
import img6 from "../../assets/images/icon (6).png";
import img7 from "../../assets/images/icon (7).png";
import img8 from "../../assets/images/icon (8).png";
import img9 from "../../assets/images/icon (9).png";



const Browsebytype = () => {
  const carCategories = [
    {
      id: 1,
      name: "SUV",
      image: img1,
    },
    {
      id: 2,
      name: "Sedan",
      image: img2,
    },
    {
      id: 3,
      name: "Hatchback",
      image: img3,
    },
    {
      id: 4,
      name: "Coupe",
      image: img4,
    },
    {
      id: 5,
      name: "Hybrid",
      image: img5,
    },
    {
      id: 6,
      name: "Convertible",
      image: img6,
    },
    {
      id: 7,
      name: "Van",
      image: img7,
    },
    {
      id: 8,
      name: "Truck",
      image: img8,
    },
    {
      id: 9,
      name: "Electric",
      image: img9,
    },
  ];
  return (
    <section className="browsebytype-section">
      <div className="container">
        <div className="browsebytype-title">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="browsebytype-text">
                <h1>Browse by Type</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CarCategories categories={carCategories} />
        </div>
      </div>
    </section>
  );
};

export default Browsebytype;
