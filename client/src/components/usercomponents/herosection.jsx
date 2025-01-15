import React from "react";
import "../../assets/stylesheets/herosection.scss";

import SearchBar from "./selectcars";
const Herosection = () => {
  return (
    <section className="Hero-section">
      <div className="container">
        <div className="hero-text-section">
          <p>
            Shop Online. Pickup Today. It’s Fast, Simple and Easy.  Learn More.
          </p>
          <h1 className="line-1 anim-typewriter">Fast, Simple and Easy</h1>
          <div className="mt-5">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
