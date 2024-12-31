import React, { useState } from "react";
import "../../assets/stylesheets/carsalesinfo.scss";
import img1 from "../../assets/images/placebid.png";
import img2 from "../../assets/images/body.png";
import img3 from "../../assets/images/mileage.png";
import img4 from "../../assets/images/flue.png";
import img5 from "../../assets/images/calendar .png";
import img6 from "../../assets/images/gearbox 1 (1).png";
import img7 from "../../assets/images/steering-wheel 1.png";
import img8 from "../../assets/images/condition.png";
import img9 from "../../assets/images/engine.png";
import img10 from "../../assets/images/door.png";
import img11 from "../../assets/images/piston 1.png";
import img12 from "../../assets/images/color.png";
import img13 from "../../assets/images/steering-wheel 1.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { PencilLine, Trash } from "lucide-react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import { useNavigate } from "react-router-dom";


const CarAuction = ({ car, getCarDetails, backendURL }) => {
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  const { token } = useSelector(state => state.auth);
  const { currentBidData } = useSelector(state => state.event);
  const [bid, setBid] = useState(car.startingBid || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [step, setStep] = useState(1);
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];

  const carPriceData =
    car.sellingType === "auction"
      ? { startingBid: car.startingBid || "", bidMargin: car.bidMargin || "" }
      : { price: car.price || "", discountedPrice: car.discountedPrice || "" };
  const carLotData = car.sellingType === "auction" && { auctionLot: car.auctionLot?._id || "" };
  const carLotNumber = car.sellingType === "auction" && { lotNo: car.lotNo || "" };

  const increaseBid = () => setBid(bid + car.bidMargin);
  const decreaseBid = () => {
    if (bid > car.startingBid) setBid(bid - car.bidMargin);
  };

  const handleStartBid = () => {
    if (socket && token && car._id) {
      if (currentBidData && currentBidData.carId !== car._id) {
        toast.error("Please close the bidding on the current car before starting a new one.");
        return;
      }
      const data = {
        carId: car._id,
        token,
      };
      socket.emit("openAuction", data);
    } else {
      console.log("Socket not connected or invalid data");
    }
  };

  const handlePlaceBid = () => {
    if (socket && token && car?._id) {
      const data = {
        carId: car._id,
        token,
        bidAmount: parseFloat(bid),
      };
      if (parseFloat(bid) <= parseFloat(currentBidData?.bidAmount || currentBidData?.currentBid || car.startingBid)) {
        toast.error("Bid amount should be greater than the current bid");
        return;
      }
      socket.emit("placeBid", data);
      setBid(currentBidData?.bidAmount)
    } else {
      console.log("Socket not connected or invalid data");
    }
  };

  const handleCloseBid = () => {
    if (socket && token && car._id) {
      const data = {
        carId: car._id,
        token,
      };
      socket.emit("closeAuction", data);
    }
  }

  const handleImageSubmit = async () => {
    try {
      let newImageUrls = [];
      for (let i = 0; i < images.length; i++) {
        try {
          const data = await CloudinaryUploader(images[i]); // Assuming you have a utility for this
          newImageUrls.push(data.url);
          console.log(data.url);
        } catch (uploadError) {
          console.error(`Error uploading file ${images[i].name}:`, uploadError);
        }
      }

      // Combine existing and new image URLs
      const updatedCarImages = [...existingImages, ...newImageUrls];

      setFormData((prevState) => ({
        ...prevState,
        carImages: updatedCarImages,
      }));

      return updatedCarImages; // Return combined array for further processing
    } catch (error) {
      toast.error("Error while uploading files");
    }
  };

  const deletCar = async (id) => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendURL}/car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        setShowDeleteModal(false); // Close the modal after deletion
        setCarIdToDelete(null); // Clear the ID after deletion
        navigate(`${car.sellingType === "auction" ? "/admin/auctioninventory" : "/admin/carlistings"}`);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setCarIdToDelete(id);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    deletCar(carIdToDelete);
  };

  const submitUpdatedCar = async () => {
    const authorizationToken = `Bearer ${token}`;
    setLoading(true);
    try {
      const updatedImages = await handleImageSubmit();
      const updatedFormData = { ...formData, carImages: updatedImages };

      const response = await fetch(`${backendURL}/car/${carToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(updatedFormData),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Car details updated successfully!");
        setShowEditModal(false);
        getCarDetails();
      } else {
        toast.error(res_data.message || "Failed to update car.");
      }
    } catch (error) {
      toast.error("Error occurred while updating car details.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="car-auction">
        <h1>{car.listingTitle || "No Title"} <span className="action-buttons">
          <button
            onClick={() => confirmDelete(car._id)}
          >
            <Trash size={16} />
          </button>
          <button
            onClick={() => {
              setCarToEdit(car._id);
              setExistingImages(car.carImages || []);
              setFormData({
                listingTitle: car.listingTitle || "",
                carMake: car.carMake?._id || "",
                carModal: car.carModal?._id || "",
                friendlyLocation: car.friendlyLocation || "",
                mapLocation: car.mapLocation || "",
                carType: car.carType?._id || "",
                description: car.description || "",
                year: car.year?._id || "",
                mileage: car.mileage || "",
                fuelType: car.fuelType?._id || "",
                transmission: car.transmission?._id || "",
                driveType: car.driveType?._id || "",
                damage: car.damage?._id || "",
                cylinders: car.cylinders?._id || "",
                engineSize: car.engineSize?._id || "",
                color: car.color?._id || "",
                vin: car.vin || "",
                noOfDoors: car.noOfDoors?._id || "",
                videoLink: car.videoLink || "",
                features: car.features || {},
                ...carPriceData,
                ...carLotNumber,
                ...carLotData,
              });
              setShowEditModal(true);
            }}
          >
            <PencilLine size={16} />
          </button>
        </span></h1>
        <p className="lot-info">Lot No. {car.lotNo}</p>
        <p className="car-details">
          {car.mileage || "No Mileage"} kms <p className="dots"></p>{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
          <p className="dots"></p> {car.transmission?.vehicleTransimission || "No Transmission"}
        </p>
        <div className="current-bid">
          {
            car.sellingType === "auction" ? (
              <>
                <p>Current Bid</p>
                <h2>AED {currentBidData && (car._id === currentBidData.carId) ? (currentBidData?.bidAmount || currentBidData?.currentBid
                  || "N/A") : <small style={{ fontSize: "10px", color: "#aaa" }}>Bidding Started on another car or not started yet</small>}</h2>
                <p>Bid Starting Price: {car.startingBid || "N/A"} AED</p>
              </>
            ) : (
              <>
                <p>Discounted Price</p>
                <h2>AED {car.discountedPrice ? car.discountedPrice : car.price || "N/A"}</h2>
                {car.discountedPrice && <p>Original Price: {car.price || "N/A"} AED</p>}
              </>
            )
          }

        </div>
        {car.sellingType === "auction" ?
          currentBidData?.auctionStatus ?
            (
              <div className="bid-controls">
                <button className="place-bid" onClick={handleCloseBid}>
                  <img src={img1} />
                  Close Bidding
                </button>
              </div>
            )
            :
            (<div className="bid-controls">
              <button className="place-bid" onClick={handleStartBid}>
                <img src={img1} />
                Start Bidding
              </button>
            </div>)
          : <div className="bid-controls">
            <button className="place-bid" style={{ backgroundColor: car.isSold && " #4682B4" }}>
              <img src={img1} />
              {
                car.isSold ? "Sold" : "Mark as Sold"
              }
            </button>
          </div>
        }

        {
          currentBidData?.auctionStatus && (
            <div className="bid-controls">
              <button onClick={decreaseBid}>-</button>
              <span>AED
                <input type="number" value={bid}
                  onChange={(e) => setBid(parseFloat(e.target.value))}
                /></span>
              <button onClick={increaseBid}>+</button>
              <button className="place-bid" onClick={handlePlaceBid}>
                <img src={img1} />
                Place Bid
              </button>
            </div>
          )
        }


        <div className="car-overview">
          <h3>Car Overview</h3>
          <ul>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img2} />
                </span>
                <p class="label">Body</p>
              </div>
              <p class="value">{car.carMake?.vehicleMake || "No Vehicle Make"}</p>
            </li>

            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img3} />
                </span>
                <p class="label">Mileage</p>
              </div>
              <p class="value">{car.mileage || "No Mileage"}000 miles</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img4} />
                </span>
                <p class="label">Fuel Type</p>
              </div>
              <p class="value">{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img5} />
                </span>
                <p class="label">Year</p>
              </div>
              <p class="value">{car.year?.vehicleYear || "N/A"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img6} />
                </span>
                <p class="label">Transmission</p>
              </div>
              <p class="value">{car.transmission?.vehicleTransimission || "No Transmission"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img7} />
                </span>
                <p class="label">Drive Type</p>
              </div>
              <p class="value">{car.driveType?.driveType}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img8} />
                </span>
                <p class="label">Condition</p>
              </div>
              <p class="value">{car.carType?.vehicleType || "No Car Type"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img9} />
                </span>
                <p class="label">Engine Size</p>
              </div>
              <p class="value">{car.engineSize?.vehicleEngineSize || "No Engine Size"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img10} />
                </span>
                <p class="label">Doors</p>
              </div>
              <p class="value">{car.noOfDoors?.vehicleDoor || "No Doors"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img11} />
                </span>
                <p class="label">Cylinders</p>
              </div>
              <p class="value">{car.cylinders?.vehicleCylinders || "N/A"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img12} />
                </span>
                <p class="label">Color</p>
              </div>
              <p class="value">{car.color?.vehicleColors || "No Color"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img13} />
                </span>
                <p class="label">VIN</p>
              </div>
              <p class="value">{car.vin || "No Vin"}</p>
            </li>
          </ul>
        </div>

        <div className="location">
          <h2>Location</h2>
          <p>
            {car.friendlyLocation || car.mapLocation || "No Location"}
          </p>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
      {/* Edit Modal */}
      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
        steps={steps}
        submitHandler={submitUpdatedCar}
        images={images}
        setImages={setImages}
        existingImages={existingImages}
        setExistingImages={setExistingImages}
        loading={loading}
        sellingType={car.sellingType}
      />
    </>
  );
};


export default CarAuction;
