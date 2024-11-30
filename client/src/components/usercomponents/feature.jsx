import React from "react";
import FeaturesSection from "../usercomponents/feature-map";

const features = [
  {
    image: require("../../images/tag (1) 1.png"),
    title: "New Special",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: require("../../images/tag (1) 1.png"),
    title: "Used Specials",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet.",
  },
  {
    image: require("../../images/tag (1) 1.png"),
    title: "Schedule Service",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: require("../../images/tag (1) 1.png"),
    title: "Value Trade",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: require("../../images/tag (1) 1.png"),
    title: "Transparent Pricing",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
  {
    image: require("../../images/tag (1) 1.png"),
    title: "Expert Car Service",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Lorem ipsum dolor sit amet",
  },
];

function Feature() {
  return <FeaturesSection features={features} />;
}

export default Feature;
