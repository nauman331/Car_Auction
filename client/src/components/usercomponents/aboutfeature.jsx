import React from "react";
import AboutFeaturesSection from "../usercomponents/aboutfeature-map";

import img from "../../assets/images/tag (1) 1.png";
import img1 from "../../assets/images/diamond.png";
import img2 from "../../assets/images/price.png";
import img3 from "../../assets/images/group.png";
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
