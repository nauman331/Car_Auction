import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import { useNavigate } from "react-router-dom";

const CarListings = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [step, setStep] = useState(1);
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];


  const handleImageSubmit = async () => {
    try {
      let newImageUrls = [];
      for (let i = 0; i < images.length; i++) {
        try {
          const data = await CloudinaryUploader(images[i]);
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




  const getAllCars = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/car`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        setCars(res_data)
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error occurred while getting all cars");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAllCars()
  }, [token])

  const deleteCarHandler = async (id) => {
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
        getAllCars();
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Error while deleting");
    }
  };

  const handleDeleteClick = (id) => {
    setCarIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (carIdToDelete) {
      deleteCarHandler(carIdToDelete);
      setShowDeleteModal(false);
    }
  };



  const submitUpdatedCar = async () => {
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
    }
  };


  const getFilteredCars = () => {
    if (!searchInput.trim()) {
      return cars;
    }
    return cars.filter(
      (car) =>
        (car.listingTitle &&
          car.listingTitle
            ?.toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (car.carModal &&
          car.carModal?.vehicleModal
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (car.description &&
          car.description?.toLowerCase().includes(searchInput.toLowerCase()))
    );
  };

  const getSortedCars = (carsToSort) => {
    switch (sortOption) {
      case "price":
        return [...carsToSort].sort((a, b) => (a.price || a.discountedPrice) - (b.price || b.discountedPrice));
      case "year":
        return [...carsToSort].sort((a, b) => a.year - b.year);
      case "sold":
        return carsToSort.filter((car) => car.isSold);
      case "unsold":
        return carsToSort.filter((car) => !car.isSold);
      default:
        return carsToSort;
    }
  };


  const getDisplayedCars = () => {
    const filteredCars = getFilteredCars();
    const sortedCars = getSortedCars(filteredCars);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCars.slice(startIndex, startIndex + itemsPerPage);
  };
  

  return (
    <>
      {loading ? <LoadingSpinner /> :
        <>
          <div className="car-list-top">
            <span>
              <h3>My Listings</h3>
              <small>List of vehicles Uploaded for Buy Now</small>
            </span>
            <NavLink to="/admin/addbuynow" className="add-vehicle-button">
              Add New Vehicle ↗
            </NavLink>
          </div>
          <div className="car-list-container container">
            <header className="car-list-header">
              <div className="car-list-header-input">
                <Search />
                <input
                  type="text"
                  placeholder="Search Cars e.g., Audi Q7"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="sort-options">
                <span>Sort By:</span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="all">All</option>
                  <option value="price">Price</option>
                  <option value="year">Year</option>
                  <option value="sold">Sold</option>
                  <option value="unsold">Unsold</option>
                </select>
              </div>

            </header>
            <div className="table-wrapper">
              <table className="car-table">
                <thead>
                  <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Transmission</th>
                    <th>FuelType</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedCars().map(
                    (car, index) =>
                      car.sellingType === "fixed" && (
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
                                <div className="price">
                                  <h6>{car.discountedPrice}</h6>
                                  {car.price && <p>{car.price}</p>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <small>{car.carModal && car.carModal.vehicleModal || "No Model"}</small>
                          </td>
                          <td>
                            <small>{car.year && car.year.vehicleYear || "No Year"}</small>
                          </td>
                          <td>
                            <small>{car.transmission && car.transmission.vehicleTransimission || "No Transmission"}</small>
                          </td>
                          <td>
                            <small>{car.fuelType && car.fuelType.vehicleFuelTypes || "No Fuel Type"}</small>
                          </td>
                          <td>
                            <small>{car.isSold ? "Sold" : "UnSold" || "No Status"}</small>
                          </td>

                          <td className="action-buttons">
                            <button onClick={() => handleDeleteClick(car._id)}>
                              <Trash size={16} />
                            </button>
                            {
                              !car.isSold ?
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
                                      price: car.price || "",
                                      discountedPrice: car.discountedPrice || "",
                                      features: car.features || {},
                                    });
                                    setShowEditModal(true);
                                  }}
                                >
                                  <PencilLine size={16} />
                                </button>
                                :
                                <button style={{ cursor: "not-allowed" }} >
                                  <PencilLine size={16} />
                                </button>
                            }
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            {
              getDisplayedCars().length > itemsPerPage &&
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            }
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
            sellingType="fixed"
          />

        </>
      }
    </>
  );
};

export default CarListings;
