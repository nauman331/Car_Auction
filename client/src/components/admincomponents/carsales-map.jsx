import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { removeBidData } from "../../store/eventSlice"
import toast from "react-hot-toast";
import { ArrowBigRight, CirclePlay, HeartPulse, PencilLine, Trash } from "lucide-react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import Select from "react-select";



const CarAuction = ({ car, getCarDetails, backendURL }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { socket } = useSelector((state) => state.socket);
  const { token } = useSelector(state => state.auth);
  const { currentBidData } = useSelector(state => state.event);
  const { currentCarColor } = useSelector(state => state.color);
  const [bid, setBid] = useState(car.startingBid || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bidLoading, setBidLoading] = useState(false)
  const [carToEdit, setCarToEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [step, setStep] = useState(1);
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];
  const [selectedAuctionLot, setSelectedAuctionLot] = useState(car.auctionLot?._id || "");
  const [auctions, setAuctions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [comingCar, setComingCar] = useState("");


  const carPriceData =
    car.sellingType === "auction"
      ? { startingBid: car.startingBid || "", bidMargin: car.bidMargin || "" }
      : { price: car.price || "", discountedPrice: car.discountedPrice || "" };

  const carLotData = car.sellingType === "auction" ? { auctionLot: car.auctionLot?._id || "" } : { auctionLot: "" };
  const carLotNumber = car.sellingType === "auction" ? { lotNo: car.lotNo || "" } : { lotNo: "" };
  const increaseBid = () => setBid(bid + car.bidMargin);
  const decreaseBid = () => setBid(bid - car.bidMargin);

  const nextCar = async () => {
    try {
      // Validate data before making request
      if (!carLotData.auctionLot || !carLotNumber.lotNo) {
        console.warn("Missing required auction data. Skipping fetch.");
        return;
      }

      const response = await fetch(`${backendURL}/car/unsold/${carLotData.auctionLot}/${carLotNumber.lotNo}`, {
        method: "GET",
      });

      const res_data = await response.json();
      const cartocome = res_data.nextCar._id;
      setComingCar(cartocome)
    } catch (error) {
      console.error("Error fetching next car:", error);
    }
  };
  const comingNext = () => {
    if (location.pathname.includes(comingCar)) {
      toast.error("No next car is available");
      return;
    }
    navigate(`/admin/carsales/${comingCar}`, { replace: true });
  }


  useEffect(() => {
    nextCar();
    setBid(car.startingBid)
  }, [carLotData.auctionLot, carLotNumber.lotNo]);


  const handleStartBid = () => {
    if (socket && token && car._id) {
            if(!car.auctionLot || !car.lotNo) {
        toast.error("Please edit auctionLot and LotNo of car first");
        return;
      }
      if (currentBidData?.auctionStatus && (currentBidData.carId !== car._id)) {
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
    if (bidLoading) return; // Prevent duplicate calls
    setBidLoading(true);

    if (socket && token && car?._id) {
      const data = {
        carId: car._id,
        token,
        bidAmount: parseFloat(bid),
      };
      if (parseFloat(bid) <= parseFloat(currentBidData?.bidAmount || currentBidData?.currentBid || car.startingBid)) {
        toast.error("Bid amount should be greater than the current bid");
        setBidLoading(false);
        return;
      }
      socket.emit("placeBid", data);
      setBid(currentBidData?.bidAmount)
      setBidLoading(false)
    } else {
      console.log("Socket not connected or invalid data");
      setBidLoading(false);
    }
  };

  const handleCloseBid = () => {
    if (socket && token && car._id) {
      const data = {
        carId: car._id,
        token,
      };
      socket.emit("closeAuction", data);
      getCarDetails();
    } else {
      console.log("Socket not connected or invalid data");
    }
  }

  const handleUnSoldBid = () => {
    if (socket && token && car._id) {
      const data = {
        carId: car._id,
        token,
      };
      socket.emit("markUnsaved", data);
      getCarDetails();
    } else {
      console.log("Socket not connected or invalid data");
    }
  }
  const handlePriceColorChange = () => {
    if (!selectedColor) {
      toast.error("please select price of color first");
      return;
    }
    if (socket && token && car._id) {
      const data = {
        carId: car._id,
        token,
        color: selectedColor
      };
      socket.emit("changeColor", data);
    } else {
      console.log("Socket not connected or invalid data");
    }
  }

  const handleStatusUpdate = (selectedStatus) => {
    if (socket && token && car?._id) {
      if (selectedStatus === "Ongoing") {
        handleStartBid();
      } else if (selectedStatus === "Completed") {
        handleCloseBid();
      } else if (selectedStatus === "UnSold") {
        handleUnSoldBid();
      }
    } else {
      toast.error("Socket not connected or invalid data");
    }
  };
  const handleUpdateStatus = () => {
    if (selectedStatus) {
      handleStatusUpdate(selectedStatus);
    } else {
      toast.error("Please select a status before updating.");
    }
  };


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
    if (currentBidData?.auctionStatus && (currentBidData?.carId === id)) {
      toast.error("Please close auction on this car first");
      return;
    }
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
        if (id === currentBidData?.carId) {
          dispatch(removeBidData());
        }
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

  // Function to handle updating the auctionLot
  const updateAuctionLot = async () => {
    if (!selectedAuctionLot) {
      toast.error("Please select an auction lot to update.");
      return;
    }

    try {
      const authorizationToken = `Bearer ${token}`;
      const response = await fetch(`${backendURL}/car/${car._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ auctionLot: selectedAuctionLot }),
      });
      const res_data = await response.json();

      if (response.ok) {
        toast.success("Auction Lot updated successfully!");
        // Optionally update local state or re-fetch car details
        getCarDetails();
      } else {
        toast.error(res_data.message || "Failed to update Auction Lot.");
      }
    } catch (error) {
      toast.error("Error occurred while updating the Auction Lot.");
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
          {
            car.isSold ? <button style={{ cursor: "not-allowed" }}>
              <PencilLine size={16} />
            </button>
              :
              <button
                onClick={() => {
                  setCarToEdit(car._id);
                  setExistingImages(car.carImages || []);
                  setFormData({
                    listingTitle: car.listingTitle || "",
                    carMake: car.carMake?._id || "",
                    carModal: car.carModal || "",
                    startCode: car.startCode || "",
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
                    color: car.color || "",
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
          }
        </span></h1>
        {car.sellingType === "auction" ? <p className="lot-info"> Lot No. {car.lotNo} | Model: {car.carModal || "No Model"}</p> : <p className="lot-info"> VIN. {car.vin} | Model: {car.carModal || "No Model"}</p>}
        <p className="car-details">
          {car.mileage || "No Mileage"}<p className="dots"></p>{car.fuelType?.vehicleFuelTypes || "No Fuel Type"}
          <p className="dots"></p> {car.transmission?.vehicleTransimission || "No Transmission"}
        </p>
        <div className="current-bid">
          {
            car.sellingType === "auction" ? (
              <>
                <button style={{ float: "right" }}
                  onClick={comingNext}
                >Next <ArrowBigRight /></button>

                <h5>Current Bid</h5>
                <h1
                  style={{
                    backgroundColor: currentCarColor?.carId === car._id && currentCarColor.color === "green" ? "#ccffcc" : "#ffcccc",
                    textAlign: "center",
                    padding: "1rem",
                    color: currentCarColor?.carId === car._id && currentCarColor.color === "green" ? "#006400" : "#b30000",
                    fontSize: "3.5rem",
                    width: "70%",
                    borderRadius: "10px"
                  }}
                >AED {currentBidData?.carId === car._id && currentBidData?.bidAmount ?
                  currentBidData?.bidAmount
                  : car?.startingBid}</h1>
                <p className="mt-4">Bid Starting Price: {car.startingBid || "N/A"} AED</p>
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
        {
          !car.isSold ?
            car.sellingType === "auction" ?
              <>
                <div className="bid-controls">
                  <button onClick={decreaseBid}>-</button>
                  <span>AED
                    <input type="number" value={bid}
                      onChange={(e) => setBid(parseFloat(e.target.value))}
                    /></span>
                  <button onClick={increaseBid}>+</button>
                  {
                    currentBidData?.auctionStatus && (currentBidData?.carId === car._id) ?
                      <button className="place-bid" onClick={handlePlaceBid} disabled={bidLoading} style={{ backgroundColor: bidLoading ? "gray" : "#405FF2" }}>
                        <img src={img1} />
                        {bidLoading ? "Placing Bid..." : "Place Bid"}
                      </button>
                      :
                      <button className="place-bid" style={{ backgroundColor: "grey", cursor: "not-allowed", border: "none" }}>
                        <img src={img1} />
                        Place Bid
                      </button>
                  }
                </div>
                <div className="form-container" style={{ border: "none", padding: "0px" }}>
                  <div className="form-section" >
                    <div className="form-grid">
                      <div className="input-container" id="auction-container" >
                        <Select
                          options={[
                            { label: "Ongoing", value: "Ongoing" },
                            { label: "Completed", value: "Completed" },
                            { label: "UnSold", value: "UnSold" },
                          ]}
                          placeholder="Select Bidding Status"
                          onChange={(selectedOption) => {
                            setSelectedStatus(selectedOption?.value);
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          id="auctionLot"
                        />
                        <label htmlFor="auctionLot">Select Status</label>
                        <button className="place-bid" style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }} onClick={handleUpdateStatus}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-container" style={{ border: "none", padding: "0px" }}>
                  <div className="form-section" >
                    <div className="form-grid">
                      <div className="input-container" id="auction-container" >
                        <Select
                          options={[
                            { label: "Red", value: "green" },
                            { label: "Green", value: "red" },
                          ]}
                          placeholder="Select Price color"
                          onChange={(selectedOption) => {
                            setSelectedColor(selectedOption?.value);
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          id="auctionLot"
                        />
                        <label htmlFor="auctionLot">Select Status</label>
                        <button className="place-bid" style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }} onClick={handlePriceColorChange}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-container" style={{ border: "none", padding: "0px" }}>
                  <div className="form-section" >
                    <div className="form-grid">
                      <div className="input-container" id="auction-container" >
                        <Select
                          options={generateAuctionOptions()} // Use the options generated from auctions
                          value={generateAuctionOptions().find(option => option.value === selectedAuctionLot)} // Match the selected value
                          onChange={(selectedOption) => setSelectedAuctionLot(selectedOption?.value)} // Update state on selection
                          placeholder="Select Auction Lot"
                          className="react-select-container"
                          classNamePrefix="react-select"
                          id="auctionLot"
                        />
                        <label htmlFor="auctionLot">Select Auction</label>
                        <button onClick={updateAuctionLot} className="place-bid" style={{ backgroundColor: "#405FF2", border: "2px solid #405FF2" }}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              :
              <>
                <div className="bid-controls">
                  <button className="place-bid">
                    {car.isSold ? "Car has been Sold" : "Not Sold Yet"}
                  </button>
                </div>
              </>
            :
            <div className="bid-controls">
              <button className="place-bid">
                Car has been already Sold
              </button>
            </div>
        }


        <div className="car-overview">
          <h3>Car Overview</h3>
          <ul>
            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img2} />
                </span>
                <p class="label">Make</p>
              </div>
              <p class="value">{car.carMake?.vehicleMake || "No Vehicle Make"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <HeartPulse size={20} />
                </span>
                <p class="label">Damage</p>
              </div>
              <p class="value">{car.damage?.vehicleDamage || "No Vehicle Damage"}</p>
            </li>
            <li>
              <div class="texts">
                <span class="icon">
                  <CirclePlay size={20} />
                </span>
                <p class="label">Start Code</p>
              </div>
              <p class="value">{car.startCode || "No Start Code"}</p>
            </li>

            <li>
              <div class="texts">
                <span class="icon">
                  <img src={img3} />
                </span>
                <p class="label">Mileage</p>
              </div>
              <p class="value">{car.mileage || "No Mileage"}</p>
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
                <p class="label">Car Type</p>
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
              <p class="value">{car.color || "No Color"}</p>
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
