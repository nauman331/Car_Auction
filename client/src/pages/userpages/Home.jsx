import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { backendURL } from "../../utils/Exports";
import { setUser } from "../../store/slices/authSlice";
import Herosection from "../../components/usercomponents/herosection";
import Browsebytype from "../../components/usercomponents/browsebytype";
import CarTabs from "../../components/usercomponents/cardatatabs";
import Livecar from "../../components/usercomponents/Live car";
import Loader from "../../components/usercomponents/loader";
import RecentlyAdded from "../../components/usercomponents/paginations";
import CarSection from "../../components/usercomponents/car";
import Feature from "../../components/usercomponents/feature";
import Premium from "../../components/usercomponents/premium";
import Reachus from "../../components/usercomponents/reachus";
import Footer from "../../components/usercomponents/footer";
import { setAuctionsData } from "../../store/slices/categorySlice";
import { setCarsData } from "../../store/slices/categorySlice";
import { setCategories } from "../../store/slices/categorySlice";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const getCategories = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const categories = [
      { name: "Vehicle Types", key: "vehicle-type", field: "vehicleType" },
      { name: "Vehicle Makes", key: "vehicle-make", field: "vehicleMake" },
      { name: "Vehicle Models", key: "vehicle-modal", field: "vehicleModal" },
      { name: "Vehicle Years", key: "vehicle-year", field: "vehicleYear" },
      { name: "Drive Types", key: "drive-type", field: "driveType" },
      {
        name: "Vehicle Transmission",
        key: "vehicle-transmission",
        field: "vehicleTransimission",
      },
      {
        name: "Vehicle Fuel Types",
        key: "vehicle-fuel-type",
        field: "vehicleFuelTypes",
      },
      {
        name: "Vehicle Cylinders",
        key: "vehicle-cylinder",
        field: "vehicleCylinders",
      },
      {
        name: "Vehicle Engine Sizes",
        key: "vehicle-engine-size",
        field: "vehicleEngineSize",
      },
      { name: "Vehicle Colors", key: "vehicle-color", field: "vehicleColors" },
      { name: "Vehicle Doors", key: "vehicle-door", field: "vehicleDoor" },
      {
        name: "Vehicle Damages",
        key: "vehicle-damage",
        field: "vehicleDamage",
      },
      {
        name: "Auction Locations",
        key: "auction-location",
        field: "auctionLocation",
      },
    ];

    await Promise.all(
      categories.map(async ({ key }) => {
        const res = await fetch(`${backendURL}/${key}`, { headers });
        if (res.ok) {
          const data = await res.json();
          dispatch(setCategories({ key, items: data }));
        } else {
          console.log("Error fetching categories for", key);
        }
      })
    );
  };

  // Fetch user data
  const getUserData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      if (!token) {
        console.log("User not logged in");
        return;
      }
      const response = await fetch(`${backendURL}/user/`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(setUser({ userdata: res_data }));
      } else {
        console.warn("Error in getting user data");
      }
    } catch (error) {
      console.log("Error in fetching user data", error);
    }
  };

  // Fetch all auctions
  const getAllAuctions = async () => {
    try {
      const response = await fetch(`${backendURL}/auction`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(setAuctionsData({ auctions: res_data }));
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error in getting all auctions");
    }
  };

  // Fetch all cars
  const getAllCars = async () => {
    try {
      const response = await fetch(`${backendURL}/car`, {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(setCarsData({ cars: res_data }));
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log("Error occurred while getting all cars");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllAuctions(), getAllCars(), getCategories()]);
      setLoading(false);
    };
    fetchData();
  }, [token, dispatch]);

  // Fetch user data if token is available
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Herosection />
          <Browsebytype />
          <CarTabs />
          <Livecar />
          <RecentlyAdded />
          <CarSection />
          <Feature />
          <Premium />
          <Reachus />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
