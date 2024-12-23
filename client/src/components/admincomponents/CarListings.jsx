import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import { Modal, Button, Form } from "react-bootstrap";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import FormGrid from "./AddBuyNow/FormGrid";

const CarListings = () => {
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);
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
      id: "price",
      label: "Buy Now Price",
      type: "text",
      placeholder: "Enter Buy Now Price",
    },
    {
      id: "discountedPrice",
      label: "Discounted Price",
      type: "text",
      placeholder: "Enter Discounted Price",
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
      id: "description",
      label: "Listing Description",
      type: "textarea",
      placeholder: "Enter Listing Description",
    },
  ];


  const getAllCars = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${backendURL}/car`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        console.log(res_data)
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

  const handleConfirmDelete = () => {
    if (carIdToDelete) {
      deleteCarHandler(carIdToDelete);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };


  const handleUpdateCar = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      const updatedFormData = {};
    Object.keys(formData).forEach((key) => {
      updatedFormData[key] = formData[key]?._id || formData[key]; // Use _id if object exists, else raw value
    });
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
          <div className="car-list-container">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getDisplayedCars().map(
                    (car, index) =>
                      car.sellingType === "fixed" && (
                        <tr key={index}>
                          <td>
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
                                <p>{car.description || "No Description"}</p>
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
                          <td className="action-buttons">
                            <button onClick={() => handleDeleteClick(car._id)}>
                              <Trash size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setCarToEdit(car._id);
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
                                  discountedPrice: car.discountedPrice || ""
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
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            }
          </div>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={handleCancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm to Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this car listing?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancelDelete}>
                No
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Car Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-container">
                <div className="form-section">
                  <div className="form-grid">
                    <FormGrid
                      fields={fields}
                      formData={formData}
                      setFormData={setFormData}
                    />
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
              <Button variant="primary" onClick={handleUpdateCar}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

        </>
      }
    </>
  );
};

export default CarListings;
