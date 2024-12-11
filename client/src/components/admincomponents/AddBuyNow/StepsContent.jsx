import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormGrid from "./FormGrid";
import FeaturesGrid from "./FeaturesGrid";
import MediaUpload from "./MediaUpload";

const StepContent = ({ step, formData, setFormData }) => {
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
  console.log(categories)
  }, [])
  

  
  const carDetailsFields = [
    { id: "listingTitle", label: "Listing Title", type: "text", placeholder: "Volvo" },
    { id: "vin", label: "VIN", type: "text", placeholder: "05034.........." },
    {
      id: "damage",
      label: "Damage",
      type: "select",
      options: categories?.["vehicle-damage"]?.map((item) => item.vehicleDamage) || ["Select Damage"]
    },
    {
      id: "type",
      label: "Type",
      type: "select",
      options: categories?.["vehicle-type"]?.map((item) => item.vehicleType) || ["Select Type"]
    },
    {
      id: "make",
      label: "Make",
      type: "select",
      options: categories?.["vehicle-make"]?.map((item) => item.vehicleMake) || ["Select Make"]
    },
    {
      id: "model",
      label: "Model",
      type: "select",
      options: categories?.["vehicle-modal"]?.map((item) => item.vehicleModal || item.name) || ["Select Model"]
    },
    {
      id: "year",
      label: "Year",
      type: "select",
      options: categories?.["vehicle-year"]?.map((item) => item.vehicleYear) || ["Select Year"]
    },
    {
      id: "driveType",
      label: "Drive Type",
      type: "select",
      options: categories?.["drive-type"]?.map((item) => item.driveType) || ["Select Drive Type"]
    },
    {
      id: "transmission",
      label: "Transmission",
      type: "select",
      options: categories?.["vehicle-transmission"]?.map((item) => item.vehicleTransimission) || ["Select Transmission"]
    },
    { id: "milage", label: "Milage", type: "text", placeholder: "75,000" },
    {
      id: "fuel",
      label: "Fuel Type",
      type: "select",
      options: categories?.["vehicle-fuel-type"]?.map((item) => item.vehicleFuelTypes) || ["Select Fuel"]
    },
    {
      id: "cylinder",
      label: "Cylinder",
      type: "select",
      options: categories?.["vehicle-cylinder"]?.map((item) => item.vehicleCylinders) || ["Select Cylinder"]
    },
    {
      id: "engineSize",
      label: "Engine Size",
      type: "select",
      options: categories?.["vehicle-engine-size"]?.map((item) => item.vehicleEngineSize) || ["Select Engine Size"]
    },
    {
      id: "color",
      label: "Color",
      type: "select",
      options: categories?.["vehicle-color"]?.map((item) => item.vehicleColors) || ["Select Color"]
    },
    { id: "door", label: "Door", type: "select", options: ["Select Door"] },
    { id: "description", label: "Listing Description", type: "textarea", placeholder: "Lorem Ipsum" },
  ];
  

  switch (step) {
    case 1:
      return <FormGrid fields={carDetailsFields} formData={formData} setFormData={setFormData} />;
    case 2:
      return <FormGrid fields={priceFields} formData={formData} setFormData={setFormData} />;
    case 3:
      return <FeaturesGrid formData={formData} setFormData={setFormData} />;
    case 4:
      return <MediaUpload formData={formData} setFormData={setFormData} />;
    case 5:
      return <FormGrid fields={locationFields} formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

const priceFields = [
  { id: "buynowPrice", label: "Buy Now Price", type: "text", placeholder: "AED 1000" },
  { id: "discountedPrice", label: "Discounted Price", type: "text", placeholder: "AED 800" },
];

const locationFields = [
  { id: "address", label: "Friendly Address", type: "text", placeholder: "Ali Tufan" },
  { id: "location", label: "Map Location", type: "text", placeholder: "e.g Linkon Park" },
];

export default StepContent;
