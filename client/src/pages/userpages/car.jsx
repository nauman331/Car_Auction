import React from "react";
import Carsale from "../../components/usercomponents/carsale";
import Footer from "../../components/usercomponents/footer";
import "../../assets/stylesheets/car responsive.scss";
import Header from "../../components/usercomponents/header";
const Carsforsale = () => {
  return (
    <div>
      <Header />
      <Carsale />
      <Footer />
    </div>
  );
};

export default Carsforsale;
