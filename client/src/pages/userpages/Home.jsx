import React, { useEffect } from "react";
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

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getUserData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      if (!token) {
        console.log("user not logged in");
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
      console.log(res_data);
      if (response.ok) {
        dispatch(setUser({ userdata: res_data }));
      } else {
        console.warn("error in getting data");
      }
    } catch (error) {
      console.log("error in fetching user data", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <div>
      <Herosection />
      <Browsebytype />
      <CarTabs />
      <Livecar />
      <Loader />
      <RecentlyAdded />
      <CarSection />
      <Feature />
      <Premium />
      <Reachus />
      <Footer />
    </div>
  );
};

export default Home;
