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
    let uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      try {
        const data = await CloudinaryUploader(images[i]);
        uploadedImages.push(data.url);
      } catch (uploadError) {
        console.error(`Error uploading file ${images[i].name}:`, uploadError);
        toast.error(`Error uploading file ${images[i].name}`);
      }
    }
    if (uploadedImages.length === 0) {
      throw new Error("No images uploaded");
    }
    return uploadedImages;
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Upload images and get URLs
      const uploadedImages = await handleImageSubmit();
  
      // Build formData with the uploaded images
      const updatedFormData = {
        ...formData,
        carImages: uploadedImages,
      };
  
      // Send the updated formData
      const response = await fetch(`${backendURL}/car/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedFormData),
      });
  
      const res_data = await response.json();
  
      if (response.ok) {
        toast.success("Car Added Successfully!");
        setFormData({ ...baseData, sellingType, ...auctionData }); // Reset formData
        setStep(1); // Reset step
        setImages([]); // Clear images
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

if(categoriesLoading) return <LoadingSpinner />

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
              style={{ backgroundColor: loading && "#167CB9" }}
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
