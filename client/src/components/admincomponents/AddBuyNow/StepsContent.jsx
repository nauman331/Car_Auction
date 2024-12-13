import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormGrid from "./FormGrid";
import FeaturesGrid from "./FeaturesGrid";
import MediaUpload from "./MediaUpload";

const StepContent = ({ step, formData, setFormData, sellingType }) => {
  const { categories, auctions } = useSelector((state) => state.category);

  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];

  const generateAuctionOptions = () =>
    auctions?.map((auction) => ({
      label: auction.auctionTitle,
      value: auction._id,
    })) || [];

  const commonFields = {
    carDetailsFields: [
      {
        id: "listingTitle",
        label: "Listing Title",
        type: "text",
        placeholder: "Volvo",
      },
      sellingType === "auction" && {
        id: "auctionLot",
        label: "Auction",
        type: "select",
        options: generateAuctionOptions(),
      },
      { id: "vin", label: "VIN", type: "text", placeholder: "05034.........." },
      {
        id: "damage",
        label: "Damage",
        type: "select",
        options: generateOptions("vehicle-damage", "vehicleDamage"),
      },
      {
        id: "carType",
        label: "Type",
        type: "select",
        options: generateOptions("vehicle-type", "vehicleType"),
      },
      {
        id: "carMake",
        label: "Make",
        type: "select",
        options: generateOptions("vehicle-make", "vehicleMake"),
      },
      {
        id: "carModal",
        label: "Model",
        type: "select",
        options: generateOptions("vehicle-modal", "vehicleModal"),
      },
      {
        id: "year",
        label: "Year",
        type: "select",
        options: generateOptions("vehicle-year", "vehicleYear"),
      },
      {
        id: "driveType",
        label: "Drive Type",
        type: "select",
        options: generateOptions("drive-type", "driveType"),
      },
      {
        id: "transmission",
        label: "Transmission",
        type: "select",
        options: generateOptions(
          "vehicle-transmission",
          "vehicleTransimission"
        ),
      },
      { id: "mileage", label: "Milage", type: "text", placeholder: "75,000" },
      {
        id: "fuelType",
        label: "Fuel Type",
        type: "select",
        options: generateOptions("vehicle-fuel-type", "vehicleFuelTypes"),
      },
      {
        id: "cylinders",
        label: "Cylinder",
        type: "select",
        options: generateOptions("vehicle-cylinder", "vehicleCylinders"),
      },
      {
        id: "engineSize",
        label: "Engine Size",
        type: "select",
        options: generateOptions("vehicle-engine-size", "vehicleEngineSize"),
      },
      {
        id: "color",
        label: "Color",
        type: "select",
        options: generateOptions("vehicle-color", "vehicleColors"),
      },
      {
        id: "noOfDoors",
        label: "Door",
        type: "select",
        options: generateOptions("vehicle-door", "vehicleDoor"),
      },
      sellingType === "auction" && {
        id: "lotNo",
        label: "Lot no.",
        type: "text",
        placeholder: "05034....",
      },
      {
        id: "description",
        label: "Listing Description",
        type: "textarea",
        placeholder: "Lorem Ipsum",
      },
    ],
    priceFields: [
      sellingType === "fixed"
        ? {
            id: "price",
            label: "Buy Now Price",
            type: "text",
            placeholder: "AED 1000",
          }
        : {
            id: "startingBid",
            label: "Bid Starting Price",
            type: "text",
            placeholder: "AED 1000",
          },
      sellingType === "fixed"
        ? {
            id: "discountedPrice",
            label: "Discounted Price",
            type: "text",
            placeholder: "AED 800",
          }
        : {
            id: "bidMargin",
            label: "Bid Margin",
            type: "text",
            placeholder: "AED 1000",
          },
    ],
    locationFields: [
      {
        id: "mapLocation",
        label: "Friendly Address",
        type: "text",
        placeholder: "Ali Tufan",
      },
      {
        id: "friendlyLocation",
        label: "Map Location",
        type: "text",
        placeholder: "e.g Linkon Park",
      },
    ],
  };

  const components = {
    1: (
      <FormGrid
        fields={commonFields.carDetailsFields}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    2: (
      <FormGrid
        fields={commonFields.priceFields}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    3: <FeaturesGrid formData={formData} setFormData={setFormData} />,
    4: <MediaUpload formData={formData} setFormData={setFormData} />,
    5: (
      <FormGrid
        fields={commonFields.locationFields}
        formData={formData}
        setFormData={setFormData}
      />
    ),
  };

  return components[step] || null;
};

export default StepContent;
