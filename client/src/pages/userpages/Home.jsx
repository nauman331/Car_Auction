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
import { backendURL, categories } from "../../utils/Exports";
import LoadingSpinner from "../../components/usercomponents/LoadingSpinner";
import { setCategories } from "../../store/slices/categorySlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendURL}/car`, { method: "GET" });

      if (!response.ok) {
        console.error("Error: Failed to fetch cars. Please try again later.");
      }

      const res_data = await response.json();
      setCars(res_data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    const headers = { "Content-Type": "application/json" };

    try {
      const fetchData = async ({ key }) => {
        const res = await fetch(`${backendURL}/${key}`, { headers });
        if (res.ok) {
          dispatch(setCategories({ key, items: data }));
        } else {
          console.error("Error while getting categories");
        }
      };

      await Promise.all(categories.map(fetchData));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    getAllCars();
    fetchCategories();
  }, []);

  return (
    <>
      {loading || categoriesLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Herosection />
          <Header />
          <Browsebytype />
          <CarTabs cars={cars} />
          <Livecar />
          <Loader />
          <RecentlyAdded data={cars} />
          <CarSection />
          <Feature />
          <Premium />
          <Reachus />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
