import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../../assets/stylesheets/carsale.scss";
import CarAuction from "./carsales-map";
import FeatureCategory from "../usercomponents/featurescatageories";
import "../../assets/stylesheets/FeatureCategory.scss";
import "../../assets/stylesheets/feature.scss";
// import img4 from "../../assets/images/report 1.png";
// import img5 from "../../assets/images/Car Brochure.png";
import { useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setBidData } from "../../store/eventSlice";

function Carsale() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [featuresData, setFeaturesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCarDetails = async () => {
    try {
      const response = await fetch(`${backendURL}/car/${id}`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (!response.ok) {
        console.log(res_data.message);
      }
      console.log(res_data);
      setCar(res_data.car);
      if (res_data.currentBid) {
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
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.pathname === "/watch"
      ) {
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
                <Carousel interval={2000} pause="hover">
                  {car.videoLink && (
                    <Carousel.Item>
                      <div className="video-container">
                        <iframe
                          width="100%"
                          height="300px"
                          style={{ borderRadius: "10px" }}
                          src={getEmbedUrl(car.videoLink || "")}
                          title="Car Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </Carousel.Item>
                  )}
                  {car.carImages.slice(0, 8).map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        style={{ height: "300px" }}
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              {car.description && (
                <div className="car-description ">
                  <h2>Description</h2>
                  {car.description || "No description available"}
                </div>
              )}
              <div className="features-sections order-2">
                {Array.isArray(featuresData) && featuresData.length > 0 && (
                  <>
                    {featuresData.some((data) => data.features?.length > 0) && (
                      <>
                        <h2>Features</h2>
                        <div className="features-details">
                          {featuresData.map((data, index) => (
                            <FeatureCategory
                              title={data.category}
                              key={index}
                              features={data.features}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 px-2">
              <CarAuction
                car={car}
                getCarDetails={getCarDetails}
                backendURL={backendURL}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carsale;
