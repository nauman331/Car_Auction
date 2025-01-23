import React from "react";
import CountUp from "react-countup";
import "../../assets/stylesheets/loader.scss";

const StatsRow = () => {
  const stats = [
    { id: 1, value: 0, suffix: "M", label: "CARS FOR SALE" },
    { id: 2, value: 0, suffix: "M", label: "DEALER REVIEWS" },
    { id: 3, value: 0, suffix: "M", label: "VISITS PER DAY" },
    { id: 4, value: 0, suffix: "M", label: "VISITED DEALERS" },
  ];

  return (
    <div className="loader-section  container-xxl ">
      <div className="row">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="loader-column col-xl-3 col-lg-3  col-md-3  col-sm-6  col-12 col-12"
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
