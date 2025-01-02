import React from "react";
import CarFilterForm from "../../components/usercomponents/filter";
import Footer from "../../components/usercomponents/footer";
import "../../assets/stylesheets/autionlist responsive.scss";
import Header from "../../components/usercomponents/header";
const Vehicle = () => {
  return (
    <div>
      <Header />
      <CarFilterForm />
      <Footer />
    </div>
  );
};

export default Vehicle;
