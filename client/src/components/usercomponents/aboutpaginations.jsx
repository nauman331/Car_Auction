import React from "react";
import "../../assets/stylesheets/paggination.scss";

import PaginatedCards from "../usercomponents/aboutpaggination-map";
import img from "../../assets/images/Surface 1.png";
import img1 from "../../assets/images/team.png";

const Aboutpaggination = () => {
  const data = [
    {
      id: 1,
      title: "Greatwork",
      image: img1,
      text: "Ahmad Al Mansouri",
      texts:
        " “I was amazed at how smooth and transparent the process was. The car I won at the auction was exactly as described. Highly recommend this platform for anyone looking for a trustworthy auto auction service.”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Fatima Al Shamsi",
      texts:
        " “This site made buying my dream car so easy! The detailed descriptions and clear bidding process gave me so much confidence. Excellent service and great customer support!.”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Mohammed Al Nuaimi",
      texts:
        " “The variety of cars available is impressive. I found a great deal on a luxury car, and the transaction was seamless. I only wish the bidding process lasted a bit longer. Still, a great experience!”",
    },
    {
      id: 1,
      title: "Greatwork",
      image: img1,
      text: "Layla Al Mazrouei",
      texts:
        " “From start to finish,this platform exceeded my expectations. The support team was quick to answer all my questions, and I felt confident throughout the auction. I love my new car!”",
    },
    {
      id: 2,
      title: "Greatwork",
      image: img1,
      text: "Khaled Al Falasi",
      texts:
        " “I’ve participated in a few auctions here, and every time, it’s been fantastic. The vehicles are in great condition, and the entire process is hassle-free. I’ll definitely be back for my next car”",
    },
    {
      id: 3,
      title: "Greatwork",
      image: img1,
      text: "Noura Al Suwaidi",
      texts:
        " “This is the best auto auction site I’ve used in the UAE! The prices are unbeatable, and the team provides excellent guidance. I got a great deal on a family SUV. Highly recommend!”",
    },
    // {
    //   id: 1,
    //   title: "Greatwork",
    //   image: img1,
    //   text: "Leslie Alexander",
    //   texts:
    //     " “This is the best auto auction site I’ve used in the UAE! The prices are unbeatable, and the team provides excellent guidance. I got a great deal on a family SUV. Highly recommend!”",
    // },
    // {
    //   id: 2,
    //   title: "Greatwork",
    //   image: img1,
    //   text: "Leslie Alexander",
    //   texts:
    //     " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    // },
    // {
    //   id: 3,
    //   title: "Greatwork",
    //   image: img1,
    //   text: "Leslie Alexander",
    //   texts:
    //     " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    // },
    // {
    //   id: 2,
    //   title: "Greatwork",
    //   image: img1,
    //   text: "Leslie Alexander",
    //   texts:
    //     " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    // },
    // {
    //   id: 3,
    //   title: "Greatwork",
    //   image: img1,
    //   text: "Leslie Alexander",
    //   texts:
    //     " “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
    // },
  ];
  return (
    <div style={{ background: "#F9FBFC" }}>
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
