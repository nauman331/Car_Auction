import React, { useState, useEffect } from "react";
import StepsNavigation from "./StepsNavigation";
import StepContent from "./StepsContent";
import "../../../assets/stylesheets/admin/addbuynow.scss";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { backendURL, categories } from "../../../utils/Exports";
import { useNavigate } from "react-router-dom";
import { setCategories } from "../../../store/slices/categorySlice";
import LoadingSpinner from "../../usercomponents/LoadingSpinner";

const AddBuyNow = ({ sellingType }) => {
  const dispatch = useDispatch();
  const { token, userdata } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];

  const baseData = {
    carImages: [],
    carMake: "",
    carModal: "",
    startCode: "",
    vendor: userdata?.id || "",
    friendlyLocation: "",
    mapLocation: "",
    carType: "",
    description: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    driveType: "",
    damage: "",
    cylinders: "",
    engineSize: "",
    color: "",
    vin: "",
    noOfDoors: "",
    isSold: false,
    videoLink: "",
    isVerified: true,
    features: { interior: [], exterior: [], safety: [], convenience: [], entertainment: [] },
  };

  const auctionData = sellingType === "auction"
    ? { auctionLot: "", lotNo: "", auctionStatus: false, startingBid: "", bidMargin: "" }
    : { price: "", discountedPrice: "" };

  const [formData, setFormData] = useState({ ...baseData, sellingType, ...auctionData });

  useEffect(() => {
    if (!token || !userdata?.id) {
      navigate("/auth");
    }
  }, [token, userdata, navigate]);

  const handleImageSubmit = async () => {
  try {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const data = await CloudinaryUploader(image);
        return data.url; // Har uploaded image ka URL return hoga
      })
    );

    if (uploadedImages.length === 0) {
      throw new Error("No images uploaded");
    }

    return uploadedImages;
  } catch (uploadError) {
    console.error("Error uploading images:", uploadError);
    toast.error("Error uploading images");
    return [];
  }
};

  const handleSubmit = async () => {
  setLoading(true);
  try {
    // Pehle formData ko reset karo taake purani images na rahein
    const freshFormData = { ...baseData, sellingType, ...auctionData };

    // Upload images
    const uploadedImages = await handleImageSubmit();
    freshFormData.carImages = uploadedImages; // Yeh line ensure karegi ke sirf naye images set hon

    // Send updated formData
    const response = await fetch(`${backendURL}/car/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(freshFormData),
    });

    const res_data = await response.json();

    if (response.ok) {
      toast.success("Car Added Successfully!");
      setImages([]);  // Images array ko reset karna zaroori hai
      setFormData({ ...baseData, sellingType, ...auctionData }); // Form reset karein
      if (sellingType === "fixed") {
        navigate("/admin/carlistings");
      } else {
        navigate("/admin/auctioninventory");
      }
    } else {
      toast.error(res_data?.errors?.[0]?.msg || res_data?.message || "Unknown error occurred.");
    }
  } catch (error) {
    console.error("Error during submission:", error);
    toast.error(error.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};



  const fetchCategories = async () => {
    setCategoriesLoading(true);
    const headers = { "Content-Type": "application/json" };

    try {
      const fetchData = async ({ key }) => {
        const res = await fetch(`${backendURL}/${key}`, { headers });

        if (res.ok) {
          const data = await res.json();
          dispatch(setCategories({ key, items: data }));
        } else {
          console.error("Error while getting categories");
        }
      };

      await Promise.all(categories.map(fetchData));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (categoriesLoading) return <LoadingSpinner />

  return (
    <div className="form-container">
      <h5>{sellingType === "fixed" ? "Add New Buy Now Vehicle" : "Add New Auction Vehicle"}</h5>
      <small>Fill the form vehicles details below</small>
      <StepsNavigation steps={steps.map(label => ({ label }))} currentStep={step} onStepChange={setStep} />
      <div className="form-section">
        <StepContent step={step} formData={formData} setFormData={setFormData} sellingType={sellingType} images={images} setImages={setImages} />
        <div className="navigation-buttons">
          <div className="next-button">
            <button
              onClick={step < steps.length ? () => setStep(step + 1) : handleSubmit}
              disabled={loading}
              style={{ backgroundColor: loading ? "#167CB9" : "#405FF2" }}
            >
              {step < steps.length ? `Next: ${steps[step]}` : loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuyNow;
