import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import FormGrid from "./AddBuyNow/FormGrid";
import MediaUpload from "./AddBuyNow/MediaUpload";
import {CloudinaryUploader} from "../../utils/CloudinaryUploader";
import { useNavigate } from "react-router-dom";
const AuctionInventory = () => {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);

  const [auctions, setAuctions] = useState([]);
  const [cars, setCars] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("images");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);


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

  const fields = [
    {
      id: "listingTitle",
      label: "Listing Title",
      type: "text",
      placeholder: "Enter Listing Title",
    },
    { id: "vin", label: "VIN", type: "text", placeholder: "Enter VIN" },
    {
      id: "auctionLot",
      label: "Auction",
      type: "select",
      placeholder: "Select Auction Lot",
      options: generateAuctionOptions(),
    },
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
    {
      id: "startingBid",
      label: "Bid Starting Price",
      type: "text",
      placeholder: "Enter Starting Bid Price",
    },
    {
      id: "bidMargin",
      label: "Bid Margin",
      type: "text",
      placeholder: "Enter Bid Margin",
    },
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
    {
      id: "vedioLink",
      label: "Vedio Link",
      type: "text",
      placeholder: "Enter VideoLink",
    },
    {
      id: "description",
      label: "Listing Description",
      type: "textarea",
      placeholder: "Enter Listing Description",
    },
  ];

  const itemsPerPage = 10;

  // Filter cars by search term
  const filteredCars = cars.filter(
    (car) =>
      car.listingTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.lotNo?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.auctionLot?.auctionTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter cars by sorting option
  const sortedCars = filteredCars.filter((car) => {
    if (sortOption === "ongoing") return car.auctionStatus; // True for Ongoing
    if (sortOption === "not started") return !car.auctionStatus; // False for Not Started
    return true; // All cars
  });


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

  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, { method: "GET" });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const res_data = await response.json();
      setAuctions(res_data); // Ensure this matches the expected structure
    } catch (error) {
      console.error("Error fetching auctions:", error);
      toast.error("Failed to fetch auctions. Please try again later.");
    }
  };
  
  const getAllCars = async () => {
    try {
      const response = await fetch(`${backendURL}/car`, { method: "GET" });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const res_data = await response.json();
      setCars(res_data); // Ensure this matches the expected structure
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars. Please try again later.");
    }
  };
  

 useEffect(() => {
  setLoading(true);
     const fetchData = async () => {
       await Promise.all([getAllAuctions(), getAllCars()]);
       setLoading(false);
     };
     fetchData();
   }, [token]);


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
        setShowModal(false); // Close the modal after deletion
        setCarIdToDelete(null); // Clear the ID after deletion
        getAllCars();
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const confirmDelete = (id) => {
    setCarIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCarIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    deletCar(carIdToDelete);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getDisplayedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCars.slice(startIndex, startIndex + itemsPerPage);
  };

  const submitUpdatedCar = async () => {
    setLoading(true);
    const authorizationToken = `Bearer ${token}`;
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
        getAllCars();
      } else {
        toast.error(res_data.message || "Failed to update car.");
      }
    } catch (error) {
      toast.error("Error occurred while updating car details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading ? <LoadingSpinner /> :
          <>
            <div className="car-list-top">
              <span>
                <h3>My Listings</h3>
                <small>List of vehicles Uploaded for Buy Now</small>
              </span>
              <NavLink to="/admin/addauction" className="add-vehicle-button">
                Add New Vehicle ↗
              </NavLink>
            </div>
            <div className="car-list-container">
              <header className="car-list-header">
                <div className="car-list-header-input">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search Cars e.g., Audi Q7"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sort-options">
                  <span>Sort By:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)} // Handle sorting option change
                  >
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="not started">Not Started</option>
                  </select>
                </div>
              </header>
              <div className="table-wrapper">
                <table className="car-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Lot No.</th>
                      <th>Starting Price</th>
                      <th>Auction</th>
                      <th>Bidding Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDisplayedCars().map(
                      (car, index) =>
                        car.sellingType === "auction" && (
                          <tr key={index}>
                            <td  
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/admin/carsales/${car._id}`)}
                            >
                              <div className="car-info">
                                <div className="car-image">
                                  <img
                                    src={car.carImages[0]}
                                    alt="..."
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div className="car-name">
                                  <p>{car.listingTitle || "No Title"}</p>
                                  <p>{car.description?.length > 20 ? car.description?.substring(0, 20).trimEnd() + '...' : car.description || "No Description"}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <small>{car.lotNo || "No Lot No"}</small>
                            </td>
                            <td>
                              <small>{car.startingBid || "No Starting Price"}</small>
                            </td>
                            <td>
                              <small>
                                {car.auctionLot?.auctionTitle || "No Auction"}
                              </small>
                            </td>
                            <td>
                              <small>
                                {car.auctionLot?.statusText || "No Status Text"}
                              </small>
                            </td>
                            <td className="action-buttons">
                              <button onClick={() => confirmDelete(car._id)}>
                                <Trash size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setCarToEdit(car._id);
                                  setExistingImages(car.carImages || []);
                                  setFormData({
                                    listingTitle: car.listingTitle || "",
                                    auctionLot: car.auctionLot?._id || "",
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
                                    startingBid: car.startingBid || "",
                                    bidMargin: car.bidMargin || "",
                                  });
                                  setShowEditModal(true);
                                }}
                              >
                                <PencilLine size={16} />
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
              {
                cars.length > itemsPerPage &&
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(sortedCars.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              }
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this car listing?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  No
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}
              fullscreen
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Car Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-container">
                  <div className="form-section">
                  <div className="tab-navigation">
                    <span className={activeTab === "images" ? "active" : ""}
                      onClick={() => setActiveTab("images")}
                    >Images</span>
                    <span
                      className={activeTab === "formData" ? "active" : ""}
                      onClick={() => setActiveTab("formData")}
                    >Form Data</span>
                  </div>
                    <div className="form-grid">
                    {activeTab === "formData" && (
                      <FormGrid fields={fields} formData={formData} setFormData={setFormData} />
                    )}
                    {activeTab === "images" && (
                      <MediaUpload
                      images={images}
                      setImages={setImages}
                      existingImages={existingImages}
                      setExistingImages={setExistingImages}
                      formData={formData}
                      setFormData={setFormData}
                    /> )}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={submitUpdatedCar}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
      }
    </>
  );
};

export default AuctionInventory;
