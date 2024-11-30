import React from "react";
import "../../assets/stylesheets/browsebytpye.scss";
import CarCategories from "../usercomponents/browse";
const Browsebytype = () => {
  const carCategories = [
    {
      id: 1,
      name: "SUV",
      image: require("../../images/icon (1).png"),
    },
    {
      id: 2,
      name: "Sedan",
      image: require("../../images/icon (2).png"),
    },
    {
      id: 3,
      name: "Hatchback",
      image: require("../../images/icon (3).png"),
    },
    {
      id: 4,
      name: "Coupe",
      image: require("../../images/icon (4).png"),
    },
    {
      id: 5,
      name: "Hybrid",
      image: require("../../images/icon (5).png"),
    },
    {
      id: 6,
      name: "Convertible",
      image: require("../../images/icon (6).png"),
    },
    {
      id: 7,
      name: "Van",
      image: require("../../images/icon (7).png"),
    },
    {
      id: 8,
      name: "Truck",
      image: require("../../images/icon (8).png"),
    },
    {
      id: 9,
      name: "Electric",
      image: require("../images/icon (9).png"),
    },
  ];
  return (
    <section className="browsebytype-section">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="browsebytype-text">
              <h1>Browse by Type</h1>
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
