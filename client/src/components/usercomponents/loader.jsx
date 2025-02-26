import React from "react";
import CountUp from "react-countup";
import "../../assets/stylesheets/loader.scss";

const StatsRow = () => {
  const stats = [
    { id: 1, value: 500, suffix: "+", label: "CARS FOR SALE" },
    { id: 2, value: 100, suffix: "+", label: "REVIEWS" },
    { id: 3, value: 10, suffix: "K", label: "VISITS PER MONTH" },
    { id: 4, value: 3, suffix: "", label: "AUCTIONS PER WEEK" },
  ];

  return (
    <div className="loader-section  container-xxl ">
      <div className="row">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="loader-column col-xl-3 col-lg-3  col-md-3  col-sm-3  col-3 col-6"
          >
            <h2 className="loader-number">
              <CountUp
                start={0}
                end={stat.value}
                suffix={stat.suffix}
                duration={1.5}
              />
            </h2>
            <p className="loader-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsRow;
