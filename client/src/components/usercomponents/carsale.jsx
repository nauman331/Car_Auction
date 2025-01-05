import React, { useEffect, useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import "../../assets/stylesheets/carsale.scss";
import CarAuction from "./carsales-map";
import FeatureCategory from "./featurescatageories";
import "../../assets/stylesheets/FeatureCategory.scss";
import "../../assets/stylesheets/feature.scss";
import img6 from "../../assets/images/playbutton.png";
import img3 from "../../assets/images/camera 1.png";
// import img4 from "../../assets/images/report 1.png";
// import img5 from "../../assets/images/Car Brochure.png";
import { useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import Relatedlistening from "./related-listening";
import { useDispatch } from "react-redux";
import { setBidData } from "../../store/eventSlice";

function Carsale() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [featuresData, setFeaturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const getCarDetails = async () => {
    try {
      const response = await fetch(`${backendURL}/car/${id}`, { method: "GET" });
      const res_data = await response.json();
      if (!response.ok) {
        console.log(res_data.message);
      }
      setCar(res_data.car);
          if(res_data.currentBid){
              dispatch(setBidData(res_data.currentBid));
            }
      setFeaturesData(
        Object.keys(res_data.car?.features).map((key) => ({
          category: key,
          features: res_data.car?.features[key],
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Failed to fetch car details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/watch") {
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (urlObj.hostname === "youtu.be") {
        const videoId = urlObj.pathname.slice(1); // Remove leading '/'
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // Return as-is for valid embed URLs
    } catch (error) {
      console.error("Invalid video URL:", error);
      return ""; // Return an empty string if the URL is invalid
    }
  };
  

  return (
    <div>
      <div className="mb-5 main">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
              <div className="carsale-section">
                <img src={car.carImages[0]} alt="..." />
                <div className="carsale-btns1">
                  <button onClick={() => setShowVideoModal(true)}>
                    <img src={img6} />
                    <span>Video</span>
                  </button>
                </div>
                <div className="carsale-btns2">
                  <button onClick={() => setShowModal(true)}>
                    <img src={img3} />
                    <p>All Photos</p>
                  </button>
                </div>
              </div>
              <div className="car-description">
                <h2>Description</h2>
                {car.description || "No description available"}
              </div>
              <div className="features-sections">
                <h2>Features</h2>
                <div className="features-details">
                  {Array.isArray(featuresData) && featuresData.length > 0 ? (
                    featuresData.map((data, index) => (
                      <FeatureCategory
                        title={data.category}
                        key={index}
                        features={data.features}
                      />
                    ))
                  ) : (
                    <p>No features available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 px-2">
              <CarAuction car={car} />
            </div>
          </div>
        </div>
        <div className="row">
            <Relatedlistening />
          </div>
      </div>

      {/* Modal for All Photos */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>All Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel interval={2000} pause="hover">
            {car.carImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>

      {/* Modal for Car Video */}
      <Modal
        show={showVideoModal}
        onHide={() => setShowVideoModal(false)}
        centered
        dialogClassName="custom-video-modal-height"
      >
        <Modal.Header closeButton>
          <Modal.Title>Car Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="video-container">
            <iframe
              width="100%"
              height="400px"
              src={getEmbedUrl(car.videoLink || "")}
              title="Car Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Carsale;


          