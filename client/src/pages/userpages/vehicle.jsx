import React, {useEffect, useState} from "react";
import CarFilterForm from "../../components/usercomponents/filter";
import Footer from "../../components/usercomponents/footer";
import "../../assets/stylesheets/autionlist responsive.scss";
import Header from "../../components/usercomponents/header";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";
import { backendURL } from "../../utils/Exports";
const Vehicle = () => {
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

if(loading) return <LoadingSpinner />

  return (
    <div>
      <Header />
      <CarFilterForm cars={cars}/>
      <Footer />
    </div>
  );
};

export default Vehicle;
