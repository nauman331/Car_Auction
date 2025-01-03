import React from "react";
import Cardsing from "../usercomponents/carddata-map";

import img from "../../assets/images/Surface 1.png"

const Vehicles = ({ cars }) => {

  return (
    <div>
      <Cardsing data={cars} />
    </div>
  );
};

export default Vehicles;
