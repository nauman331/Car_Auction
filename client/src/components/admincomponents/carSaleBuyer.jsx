import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import CarAuction from "./carSaleMapBuyer";
import "../../assets/stylesheets/carsale.scss";
import { useParams } from "react-router-dom";
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../usercomponents/LoadingSpinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBidData } from "../../store/eventSlice";

function Carsale() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentBidData } = useSelector((state) => state.event);
  const { currentCarColor } = useSelector((state) => state.color);

  const [car, setCar] = useState(null);
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
      setCar(res_data.car);
      if (res_data.currentBid) {
        dispatch(setBidData(res_data.currentBid));
      }
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 ">
              <div className="carsale-section">
                <Carousel interval={2000} pause="hover">
                  {car.carImages.slice(0, 10).map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        style={{ height: "300px" }}
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
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
                </Carousel>
              </div>
              <h1
                style={{
                  fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "40px",
                  lineHeight: "45px",
                  color: "#050b20",
                  margin: "1rem auto",
                }}
              >
                {car.listingTitle || "No Title"}{" "}
              </h1>
              <div className="current-bid">
                <h5>Current Bid</h5>
                <h1
                  style={{
                    backgroundColor:
                      currentCarColor?.carId === car._id &&
                      currentCarColor.color === "green"
                        ? "#ccffcc"
                        : "#ffcccc",
                    textAlign: "center",
                    padding: "1rem",
                    color:
                      currentCarColor?.carId === car._id &&
                      currentCarColor.color === "green"
                        ? "#006400"
                        : "#b30000",
                    fontSize: "3.5rem",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  AED{" "}
                  {currentBidData?.carId === car._id &&
                  (currentBidData?.bidAmount || currentBidData?.currentBid)
                    ? currentBidData?.bidAmount || currentBidData?.currentBid
                    : car?.startingBid}
                </h1>

                <h3
                  style={{
                    backgroundColor: "#cce5ff",
                    color: "#004085",
                    textAlign: "center",
                    padding: "1rem",
                    marginTop: "1rem",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  Bid Placed:{" "}
                  {currentBidData?.carId === car._id
                    ? currentBidData?.bidhistory?.length > 0
                      ? currentBidData.bidhistory[
                          currentBidData.bidhistory.length - 1
                        ]?.bidType
                      : currentBidData?.bids?.length > 0
                      ? currentBidData.bids[currentBidData.bids.length - 1]
                          ?.bidType || "None"
                      : "None"
                    : "None"}
                </h3>

                <p className="mt-4">
                  Bid Starting Price: {car.startingBid || "N/A"} AED
                </p>
              </div>
              {car.isSold && (
                <h4 style={{ color: "#aaa", margin: "1rem 0" }}>
                  Car is already Sold
                </h4>
              )}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 px-2 order-1">
              <CarAuction car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carsale;
