import React, { useEffect, useState } from "react";
import "../../assets/stylesheets/home.scss";
import Header from "../../components/usercomponents/header-light";
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
import { backendURL } from "../../utils/Exports";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendURL}/car`, { method: "GET" });

      if (!response.ok) {
        toast.error("Error: Failed to fetch cars. Please try again later.");
      }

      const res_data = await response.json();
      setCars(res_data); // Ensure this matches the expected structure
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      getAllCars();
    }, []);
  return (
    <>
    {loading ? <LoadingSpinner /> : 
    <div>
      <Herosection />
      <Header />
      <Browsebytype />
      <CarTabs cars={cars}/>
      <Livecar />
      <Loader />
      <RecentlyAdded />
      <CarSection />
      <Feature />
      <Premium />
      <Reachus />
      <Footer />
      </div>
    }
    </>
  );
};

export default Home;
