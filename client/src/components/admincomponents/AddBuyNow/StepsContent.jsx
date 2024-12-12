import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormGrid from "./FormGrid";
import FeaturesGrid from "./FeaturesGrid";
import MediaUpload from "./MediaUpload";

const StepContent = ({ step, formData, setFormData }) => {
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  // Car Details Fields
  const carDetailsFields = [
    { id: "listingTitle", label: "Listing Title", type: "text", placeholder: "Volvo" },
    { id: "vin", label: "VIN", type: "text", placeholder: "05034.........." },
    {
      id: "damage",
      label: "Damage",
      type: "select",
      options: categories?.["vehicle-damage"]?.map((item) => ({
        label: item.vehicleDamage,
        value: item._id,
      })) || [],
    },
    {
      id: "carType",
      label: "Type",
      type: "select",
      options: categories?.["vehicle-type"]?.map((item) => ({
        label: item.vehicleType,
        value: item._id,
      })) || [],
    },
    {
      id: "carMake",
      label: "Make",
      type: "select",
      options: categories?.["vehicle-make"]?.map((item) => ({
        label: item.vehicleMake,
        value: item._id,
      })) || [],
    },
    {
      id: "carModal",
      label: "Model",
      type: "select",
      options: categories?.["vehicle-modal"]?.map((item) => ({
        label: item.vehicleModal || item.name,
        value: item._id,
      })) || [],
    },
    {
      id: "year",
      label: "Year",
      type: "select",
      options: categories?.["vehicle-year"]?.map((item) => ({
        label: item.vehicleYear,
        value: item._id,
      })) || [],
    },
    {
      id: "driveType",
      label: "Drive Type",
      type: "select",
      options: categories?.["drive-type"]?.map((item) => ({
        label: item.driveType,
        value: item._id,
      })) || [],
    },
    {
      id: "transmission",
      label: "Transmission",
      type: "select",
      options: categories?.["vehicle-transmission"]?.map((item) => ({
        label: item.vehicleTransimission,
        value: item._id,
      })) || [],
    },
    { id: "mileage", label: "Milage", type: "text", placeholder: "75,000" },
    {
      id: "fuelType",
      label: "Fuel Type",
      type: "select",
      options: categories?.["vehicle-fuel-type"]?.map((item) => ({
        label: item.vehicleFuelTypes,
        value: item._id,
      })) || [],
    },
    {
      id: "cylinders",
      label: "Cylinder",
      type: "select",
      options: categories?.["vehicle-cylinder"]?.map((item) => ({
        label: item.vehicleCylinders,
        value: item._id,
      })) || [],
    },
    {
      id: "engineSize",
      label: "Engine Size",
      type: "select",
      options: categories?.["vehicle-engine-size"]?.map((item) => ({
        label: item.vehicleEngineSize,
        value: item._id,
      })) || [],
    },
    {
      id: "color",
      label: "Color",
      type: "select",
      options: categories?.["vehicle-color"]?.map((item) => ({
        label: item.vehicleColors,
        value: item._id,
      })) || [],
    },
    {
      id: "noOfDoors",
      label: "Door",
      type: "select",
      options: categories?.["vehicle-door"]?.map((item) => ({
        label: item.vehicleDoor,
        value: item._id,
      })) || [],
    },
    {
      id: "description",
      label: "Listing Description",
      type: "textarea",
      placeholder: "Lorem Ipsum",
    },
  ];

  // Price Fields
  const priceFields = [
    { id: "price", label: "Buy Now Price", type: "text", placeholder: "AED 1000" },
    { id: "discountedPrice", label: "Discounted Price", type: "text", placeholder: "AED 800" },
  ];

  // Location Fields
  const locationFields = [
    { id: "mapLocation", label: "Friendly Address", type: "text", placeholder: "Ali Tufan" },
    { id: "friendlyLocation", label: "Map Location", type: "text", placeholder: "e.g Linkon Park" },
  ];

  // Return appropriate form fields based on step
  switch (step) {
    case 1:
      return (
        <FormGrid
          fields={carDetailsFields}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 2:
      return (
        <FormGrid
          fields={priceFields}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 3:
      return <FeaturesGrid formData={formData} setFormData={setFormData} />;
    case 4:
      return <MediaUpload formData={formData} setFormData={setFormData} />;
    case 5:
      return (
        <FormGrid
          fields={locationFields}
          formData={formData}
          setFormData={setFormData}
        />
      );
    default:
      return null;
  }
};

export default StepContent;
