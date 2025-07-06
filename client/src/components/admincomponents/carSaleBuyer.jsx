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
import Logo from "../../assets/images/Logo.svg";

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
      <div
        className="mb-5 main"
        style={{ minHeight: "auto", padding: "1rem 0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
              <div
                className="carsale-section"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  background: "#ffffff",
                  marginTop: "3rem",
                }}
              >
                <Carousel interval={2000} pause="hover">
                  {car.carImages.slice(0, 10).map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        style={{
                          height: "140px",
                          objectFit: "cover",
                          width: "100%",
                        }}
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
                          height="140px"
                          style={{ borderRadius: "0" }}
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
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "#050b20",
                  margin: "0.8rem auto 0.4rem",
                }}
              >
                {car.listingTitle || "No Title"}{" "}
              </h1>
              <div className="current-bid">
                <h5
                  style={{
                    fontSize: "0.9rem",
                    marginBottom: "0.4rem",
                    color: "#666",
                  }}
                >
                  Current Bid
                </h5>
                <h1
                  style={{
                    backgroundColor:
                      currentCarColor?.carId === car._id &&
                      currentCarColor.color === "green"
                        ? "#ccffcc"
                        : "#ffcccc",
                    textAlign: "center",
                    padding: "0.5rem",
                    color:
                      currentCarColor?.carId === car._id &&
                      currentCarColor.color === "green"
                        ? "#006400"
                        : "#b30000",
                    fontSize: "1.6rem",
                    borderRadius: "8px",
                    width: "100%",
                    margin: "0.3rem 0",
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                    width: "100%",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    textTransform: "capitalize",
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

                <p
                  className="mt-2"
                  style={{ fontSize: "0.75rem", color: "#666" }}
                >
                  Starting Price: {car.startingBid || "N/A"} AED
                </p>
              </div>
              {car.isSold && (
                <div
                  style={{
                    color: "#888",
                    margin: "0.8rem 0",
                    padding: "0.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  🔒 SOLD
                </div>
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
