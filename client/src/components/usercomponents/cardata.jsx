import React from "react";
import Cardsing from "../usercomponents/carddata-map";
import img from "../../assets/images/Surface 1.png"

const Vehicles = () => {
  const data = [
    {
      id: 1,
      title: "Mercedes-Benz, C Class",
      image: img,

      delete: "$3000",
      price: "$399",
    },
    {
      id: 2,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 3,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 4,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 5,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 6,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 7,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
    {
      id: 8,
      title: "Mercedes-Benz, C Class",
      image: img,
      delete: "$3000",
      price: "$399",
    },
  ];

  return (
    <div>
      <Cardsing data={data} />
    </div>
  );
};

export default Vehicles;
