import React from "react";
import BuyfilterForm from "../../components/usercomponents/buylist";
import Footer from "../../components/usercomponents/footer";
import "../../assets/stylesheets/autionlist responsive.scss";
import Header from "../../components/usercomponents/header";

const Vehicle = () => {

  return (
    <div>
      <Header />
      <BuyfilterForm sellingType="fixed"/>
      <Footer />
    </div>
  );
};

export default Vehicle;
