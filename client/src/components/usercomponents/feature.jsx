import React from "react";
import FeaturesSection from "../usercomponents/feature-map";
import img from "../../assets/images/exclusive_5110900.svg";
import img1 from "../../assets/images/overview_13794240.svg";
import img2 from "../../assets/images/auction_563518.svg";
import img3 from "../../assets/images/monetary_17011743.svg";
import img4 from "../../assets/images/notification_18087044.svg";
import img5 from "../../assets/images/monetary_17011743.svg";

const features = [
  {
    image: img,
    title: "Exclusive Auction",
    description:
      "Access unique and limited-time offers on a variety of vehicles. Get the best value through our exclusive online and in-person auctions.",
  },
  {
    image: img1,
    title: "Pre-Auction Preview",
    description:
      "Preview top-quality cars with pre-auction Details. We bring all details to you before the bidding starts.",
  },
  {
    image: img2,
    title: "Easy Bidding Process",
    description:
      "Join our simple, user-friendly bidding platform. Place your bid and track your progress with ease.",
  },
  {
    image: img3,
    title: "No Hidden Fees",
    description:
      "Bid with confidence knowing there are no hidden fees. What you see is what you pay, with full transparency at every step.",
  },
  {
    image: img4,
    title: "Instant Notifications & Updates",
    description:
      "Stay informed with instant notifications on your bids, auction results, and special offers. Never miss a chance to get the best deal.",
  },
  {
    image: img5,
    title: "Expert Auction Support",
    description:
      "Get the assistance you need from our experienced auction professionals. Whether you’re buying or selling, we’re here to help.",
  },
];

function Feature() {
  return <FeaturesSection features={features} />;
}

export default Feature;
