import React from "react";
import FormGrid from "./FormGrid";
import FeaturesGrid from "./FeaturesGrid";
import MediaUpload from "./MediaUpload";

const StepContent = ({ step }) => {
  switch (step) {
    case 1:
      return <FormGrid fields={carDetailsFields} />;
    case 2:
      return <FormGrid fields={priceFields} />;
    case 3:
      return <FeaturesGrid />;
    case 4:
      return <MediaUpload />;
    case 5:
      return <FormGrid fields={locationFields} />;
    default:
      return null;
  }
};

const carDetailsFields = [
    { id: "listingTitle", label: "Listing Title", type: "text", placeholder: "Volvo" },
    { id: "auction", label: "Auction", type: "select", options: ["Auction no. 127(Sunday)"] },
    { id: "vin", label: "VIN", type: "text", placeholder: "05034.........." },
    { id: "type", label: "Type", type: "select", options: ["Sedan"] },
    { id: "make", label: "Make", type: "select", options: ["Select Make"] },
    { id: "model", label: "Model", type: "select", options: ["Select Model"] },
    { id: "year", label: "Year", type: "select", options: ["Select Year"] },
    { id: "drive type", label: "Drive Type", type: "select", options: ["Select Type"] },
    { id: "transmission", label: "Transmission", type: "select", options: ["Select Transmission"] },
    { id: "milage", label: "Milage", type: "text", placeholder: "75,000" },
    { id: "fuel", label: "Fuel Type", type: "select", options: ["Select Fuel"] },
    { id: "cylinder", label: "Cylinder", type: "select", options: ["Select Cylinder"] },
    { id: "engine size", label: "Engine Size", type: "select", options: ["Engine Size"] },
    { id: "color", label: "Color", type: "select", options: ["Select Color"] },
    { id: "door", label: "Door", type: "select", options: ["Select Door"] },
    { id: "damage", label: "Damage", type: "select", options: ["Select Damage"] },
    { id: "lot no", label: "Lot no.", type: "text", placeholder: "05034.........." },
    { id: "description", label: "Listing Discription", type: "textarea", placeholder: "Lorem Ipsum" },
  ];

const priceFields = [
    { id: "bidPrice", label: "Bid Starting Price ($)", type:"text", placeholder: "e.g. 1000" },
    { id: "bidMargin", label: "Bid Margin",type:"text", placeholder: "1000" },
  ];

const locationFields = [
    { id: "address", label: "Friendly Address",type:"text", placeholder: "Ali Tufan" },
    { id: "location", label: "Map Location",type:"text", placeholder: "e.g Linkon Park" },
  ];

export default StepContent;
