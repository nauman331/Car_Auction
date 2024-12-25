import React from "react";
import FeaturesSection from "./feature-map";
import img from "../../assets/images/tag (1) 1.png";

const features = [
  {
    image: img,
    title: "New Special",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: img,
    title: "Used Specials",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet.",
  },
  {
    image: img,
    title: "Schedule Service",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: img,
    title: "Value Trade",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: img,
    title: "Transparent Pricing",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: img,
    title: "Expert Car Service",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
];

function Feature() {
  return <FeaturesSection features={features} />;
}

export default Feature;
