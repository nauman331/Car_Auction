import React from "react";
import Cardsing from "../usercomponents/carddata-map";

const Vehicles = ({ cars }) => {

  return (
    <div>
      <Cardsing data={cars} />
    </div>
  );
};

export default Vehicles;
