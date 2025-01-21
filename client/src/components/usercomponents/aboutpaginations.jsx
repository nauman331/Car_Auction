import React from "react";
import "../../assets/stylesheets/paggination.scss";

import PaginatedCards from "../usercomponents/aboutpaggination-map";
import img from "../../assets/images/Surface 1.png";
import img1 from "../../assets/images/men.png";

const Aboutpaggination = () => {
  const data = [
    {
      id: 1,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 1,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 1,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Leslie Alexander",
      texts:
        " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    },
  ];
  return (
    <div style={{ background: "#F9FBFC", padding: "4px 20px 30px" }}>
      <div className="container">
        <div className="recentlyadd-section">
          <h2>What our customers say</h2>
        </div>

        <PaginatedCards data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default Aboutpaggination;
