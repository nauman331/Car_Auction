import React, { useEffect, useMemo, useState } from "react";
import "../../assets/stylesheets/admin/carlisting.scss";
import { Trash, PencilLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { backendURL } from "../../utils/Exports";
import Pagination from "./Pagination";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useSelector, useDispatch } from "react-redux";
import { removeBidData } from "../../store/eventSlice";

const AuctionInventory = () => {
  const { currentBidData } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [auctions, setAuctions] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedAuctionLot, setSelectedAuctionLot] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [step, setStep] = useState(1);
  const steps = ["Car Details", "Price", "Features", "Media", "Location"];


  const itemsPerPage = 10;

  const filteredCars = useMemo(() => {
    return cars.length > 0
      ? cars.filter((car) => {
        const matchesSearch =
          car.listingTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.lotNo?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.vin.includes(searchTerm);

        const matchesAuctionLot =
          selectedAuctionLot === "Not in Auction"
            ? !car.auctionLot // Include cars where auctionLot is null or undefined
            : car.auctionLot?._id === selectedAuctionLot || selectedAuctionLot === "";

        return matchesSearch && matchesAuctionLot;
      })
      : [];
  }, [cars, selectedAuctionLot, searchTerm]);


  const handleAuctionLotChange = (event) => {
    setSelectedAuctionLot(event.target.value); // Update selected auction lot
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

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendURL}/car`, { method: "GET" });
      const res_data = await response.json();
      if (!response.ok) {
        console.log(res_data.message)
      }
      setCars(res_data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const getAllAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      console.log(res_data)
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
    getAllCars();
    getAllAuctions();
  }, []);
  useEffect(() => {
    if (auctions.length > 0) {
      const nearestAuction = sortAuctionsByTime(auctions)[0]; // Get the nearest auction (first in the sorted array)
      setSelectedAuctionLot(nearestAuction._id); // Set the default selected auction lot to the nearest auction
    }
  }, [auctions]);
  const sortedCarsByLotNo = useMemo(() => {
    return filteredCars.sort((a, b) => {
      const lotNoA = a.lotNo ? parseInt(a.lotNo) : Infinity; // Put undefined lotNo at the end
      const lotNoB = b.lotNo ? parseInt(b.lotNo) : Infinity;
      return lotNoA - lotNoB;
    });
  }, [filteredCars]);
  

  const sortAuctionsByTime = (auctions) => {
    const currentTime = new Date();

    // Function to combine auctionDate and auctionTime into a single Date object
    const getAuctionDateTime = (auctionDate, auctionTime) => {
      const date = new Date(auctionDate);
      const [hours, minutes] = auctionTime.split(" ")[0].split(":").map(num => parseInt(num, 10)); // Extract hours and minutes
      const ampm = auctionTime.split(" ")[1]; // AM/PM part
      date.setHours(ampm === "PM" ? hours + 12 : hours); // Set hours based on AM/PM
      date.setMinutes(minutes);
      return date;
    };

    // Sort auctions by the nearest upcoming date and time
    auctions.sort((a, b) => {
      const aDateTime = getAuctionDateTime(a.auctionDate, a.auctionTime);
      const bDateTime = getAuctionDateTime(b.auctionDate, b.auctionTime);

      // Compare auction times to current time
      return aDateTime - bDateTime;
    });

    return auctions;
  };

  const sortedAuctions = sortAuctionsByTime(auctions);





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
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    deletCar(carIdToDelete);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getDisplayedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCars.slice(startIndex, startIndex + itemsPerPage);
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

  return (
    <>
      {
        loading ? <LoadingSpinner /> :
          <>
            <div className="car-list-top">
              <span>
                <h3>My Listings</h3>
                <small>List of vehicles Uploaded for Auction</small>
              </span>
              <NavLink to="/admin/addauction" className="add-vehicle-button">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sort-options">
                  <span>Sort By:</span>
                  <select onChange={handleAuctionLotChange} value={selectedAuctionLot}>
                    {sortedAuctions.length > 0 ? (
                      sortedAuctions.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.auctionTitle}
                        </option>

                      ))
                    ) : (
                      <option value="">No Auctions Available</option>
                    )}
                    <option value="Not in Auction">Not Associated</option>
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
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDisplayedCars().length > 0 && sortedCarsByLotNo.map(
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
                                  <p>VIN: {car.vin || "No VIN"}</p>
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
                                {
                                  car.isSold
                                    ? "Sold"
                                    : car._id === currentBidData?.carId
                                      ? currentBidData?.auctionStatus
                                        ? "Ongoing"
                                        : "Pending"
                                      : "Pending"

                                }
                              </small>
                            </td>

                            <td className="action-buttons">
                              <button onClick={() => confirmDelete(car._id)}>
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
                                        auctionLot: car.auctionLot?._id || "",
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
                                        startingBid: car.startingBid || "",
                                        bidMargin: car.bidMargin || "",
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
                  totalPages={Math.ceil(sortedCars.length / itemsPerPage)}
                  onPageChange={handlePageChange}
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
              sellingType="auction"
            />
          </>
      }
    </>
  );
};

export default AuctionInventory;
