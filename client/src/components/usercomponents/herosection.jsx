import React from "react";
import HeroTabs from "./herotab";
import "../../assets/stylesheet/herosection.scss";
import SearchBar from "../usercomponents/selectcars";
const Herosection = () => {
  return (
    <section className="Hero-section">
      <div className="container">
        <div className="hero-text-section">
          <p>
            Shop Online. Pickup Today. It’s Fast, Simple and Easy.  Learn More.
          </p>
          <h1>Fast, Simple and Easy</h1>
          <div>
            <HeroTabs />
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
