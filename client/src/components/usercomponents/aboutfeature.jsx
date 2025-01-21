import React from "react";
import AboutFeaturesSection from "../usercomponents/aboutfeature-map";
import img from "../../assets/images/exclusive_5110900.svg";
import img1 from "../../assets/images/overview_13794240.svg";
import img2 from "../../assets/images/auction_563518.svg";
import img3 from "../../assets/images/monetary_17011743.svg";
const features = [
  {
    image: img,
    title: "Special Financing Offers",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: img1,
    title: "Trusted Car Dealership",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: img2,
    title: "Transparent Pricing",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: img3,
    title: "Expert Car Service",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
];

function Feature() {
  return <AboutFeaturesSection features={features} />;
}

export default Feature;
