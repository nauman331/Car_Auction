import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormGrid from "./FormGrid";
import FeaturesGrid from "./FeaturesGrid";
import MediaUpload from "./MediaUpload";
import LoadingSpinner from "../../usercomponents/LoadingSpinner";
import {backendURL} from "../../../utils/Exports"


const StepContent = ({ step, formData, setFormData, sellingType, images, setImages, existingImages, setExistingImages }) => {
  const { categories } = useSelector((state) => state.category);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        setAuctions(res_data);
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAuctions();
  }, []);
  if (loading) return <LoadingSpinner />
  const generateAuctionOptions = () =>
    auctions?.map((auction) => ({
      label: auction.auctionTitle,
      value: auction._id,
    })) || [];
  const generateOptions = (key, labelKey) =>
    categories?.[key]?.map((item) => ({
      label: item[labelKey],
      value: item._id,
    })) || [];


  const commonFields = {
    carDetailsFields: [
      {
        id: "listingTitle",
        label: "Listing Title",
        type: "text",
        placeholder: "Enter Listing Title",
      },
      sellingType === "auction" && {
        id: "auctionLot",
        label: "Auction",
        type: "select",
        placeholder: "Select Auction Lot",
        options: generateAuctionOptions(),
      },
      { id: "vin", label: "VIN", type: "text", placeholder: "Enter VIN" },
      {
        id: "damage",
        label: "Damage",
        type: "select",
        placeholder: "Select Damage",
        options: generateOptions("vehicle-damage", "vehicleDamage"),
      },
      {
        id: "carType",
        label: "Type",
        type: "select",
        placeholder: "Select Car Type",
        options: generateOptions("vehicle-type", "vehicleType"),
      },
      {
        id: "carMake",
        label: "Make",
        type: "select",
        placeholder: "Select Car Make",
        options: generateOptions("vehicle-make", "vehicleMake"),
      },
      {
        id: "carModal",
        label: "Model",
        type: "select",
        placeholder: "Select Car Model",
        options: generateOptions("vehicle-modal", "vehicleModal"),
      },
      {
        id: "year",
        label: "Year",
        type: "select",
        placeholder: "Select Year",
        options: generateOptions("vehicle-year", "vehicleYear"),
      },
      {
        id: "driveType",
        label: "Drive Type",
        type: "select",
        placeholder: "Select Drive Type",
        options: generateOptions("drive-type", "driveType"),
      },
      {
        id: "transmission",
        label: "Transmission",
        type: "select",
        placeholder: "Select Transmission",
        options: generateOptions(
          "vehicle-transmission",
          "vehicleTransimission"
        ),
      },
      { id: "mileage", label: "Milage", type: "text", placeholder: "Enter Mileage" },
      {
        id: "fuelType",
        label: "Fuel Type",
        type: "select",
        placeholder: "Select Fuel Type",
        options: generateOptions("vehicle-fuel-type", "vehicleFuelTypes"),
      },
      {
        id: "cylinders",
        label: "Cylinder",
        type: "select",
        placeholder: "Select Cylinder",
        options: generateOptions("vehicle-cylinder", "vehicleCylinders"),
      },
      {
        id: "engineSize",
        label: "Engine Size",
        type: "select",
        placeholder: "Select Engine Size",
        options: generateOptions("vehicle-engine-size", "vehicleEngineSize"),
      },
      {
        id: "color",
        label: "Color",
        type: "select",
        placeholder: "Select Color",
        options: generateOptions("vehicle-color", "vehicleColors"),
      },
      {
        id: "noOfDoors",
        label: "Door",
        type: "select",
        placeholder: "Select Number Of Doors",
        options: generateOptions("vehicle-door", "vehicleDoor"),
      },
      sellingType === "auction" && {
        id: "lotNo",
        label: "Lot no.",
        type: "text",
        placeholder: "Enter Lot No",
      },
      {
        id: "description",
        label: "Listing Description",
        type: "textarea",
        placeholder: "Enter Listing Description",
      },
    ],
    priceFields: [
      sellingType === "fixed"
        ? {
          id: "price",
          label: "Buy Now Price",
          type: "text",
          placeholder: "Enter Buy Now Price",
        }
        : {
          id: "startingBid",
          label: "Bid Starting Price",
          type: "text",
          placeholder: "Enter Starting Bid Price",
        },
      sellingType === "fixed"
        ? {
          id: "discountedPrice",
          label: "Discounted Price",
          type: "text",
          placeholder: "Enter Discounted Price",
        }
        : {
          id: "bidMargin",
          label: "Bid Margin",
          type: "text",
          placeholder: "Enter Bid Margin",
        },
    ],
    locationFields: [
      {
        id: "mapLocation",
        label: "Friendly Address",
        type: "text",
        placeholder: "Enter Freindly Address",
      },
      {
        id: "friendlyLocation",
        label: "Map Location",
        type: "text",
        placeholder: "Enter Map Location",
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
    4: <MediaUpload formData={formData} setFormData={setFormData} images={images} setImages={setImages} sellingType={sellingType} existingImages={existingImages} setExistingImages={setExistingImages} />,
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
