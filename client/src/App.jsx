import {useEffect} from "react"
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/stylesheets/car responsive.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setBidData, removeBidData } from "./store/eventSlice"
import { backendURL } from "./utils/Exports";
import { setUser } from "./store/slices/authSlice"
import ProtectedRoute from "./utils/ProtectedRoute";

// Lazy-loaded components
const Auth = lazy(() => import("./pages/userpages/Auth"));
const Home = lazy(() => import("./pages/userpages/Home"));
const ContactUs = lazy(() => import("./pages/userpages/contact-us"));
const Aboutus = lazy(() => import("./pages/userpages/about-us"));
const OTPVerificationForm = lazy(() => import("./components/usercomponents/OTPVerificationForm"));
const AdminHome = lazy(() => import("./pages/adminpages/AdminHome"));
const Dashboard = lazy(() => import("./components/admincomponents/Dashboard"));
const AddAuctionForm = lazy(() => import("./components/admincomponents/AddAuction"));
const AddBuyNow = lazy(() => import("./components/admincomponents/AddBuyNow/AddBuyNow"));
const CarListings = lazy(() => import("./components/admincomponents/CarListings"));
const AuctionListings = lazy(() => import("./components/admincomponents/AuctionListings"));
const Events = lazy(() => import("./pages/userpages/auction-events"));
const Privacypolicy = lazy(() => import("./pages/userpages/privacy"));
const Terms = lazy(() => import("./pages/userpages/terms"));
const CategoryManagement = lazy(() => import("./components/admincomponents/Categories"));
const Withdraw = lazy(() => import("./components/usercomponents/withdrawform"));
const Orders = lazy(() => import("./components/admincomponents/Orders"));
const AuctionInventory = lazy(() => import("./components/admincomponents/AuctionInventory"));
const Profile = lazy(() => import("./components/admincomponents/Profile"));
const AllUsers = lazy(() => import("./components/admincomponents/AllUsers"));
const Verificationform = lazy(() => import("./components/usercomponents/Verificationform"));
const Deposits = lazy(() => import("./components/admincomponents/Deposits"));
const CarSales = lazy(() => import("./components/admincomponents/carsale"));
const UserPanel = lazy(() => import("./pages/userpages/UserPanel"));
const Wallet = lazy(() => import("./components/usercomponents/userpanel/Wallet"));
const Carsforsale = lazy(() => import("./pages/userpages/car"));
const Vehicle = lazy(() => import("./pages/userpages/auction-vehicle"));
const BuyfilterForm = lazy(() => import("./pages/userpages/buynow-vehicle"));
const Buycarforsale = lazy(() => import("./pages/userpages/buycar"));
const DepositDetail = lazy(() => import("./components/admincomponents/DepositDetail"));
const UserDashboard = lazy(() => import("./components/usercomponents/userpanel/Dashboard"));
const UserOrders = lazy(() => import("./components/usercomponents/userpanel/Orders"));
const Invoice = lazy(() => import("./components/admincomponents/Invoice"));
const UserInvoice = lazy(() => import("./components/usercomponents/userpanel/Invoice"));
const NotifcationDetails = lazy(() => import("./components/admincomponents/NotificationDetails"));
const UserDetail = lazy(() => import("./components/admincomponents/UserDetail"));
const Withdrawals = lazy(() => import("./components/admincomponents/Withdrawals"));
const WithdrawDetail = lazy(() => import("./components/admincomponents/WithdrawDetail"));

function App() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { currentBidData } = useSelector((state) => state.event);
  const { token, userdata } = useSelector((state) => state.auth);

  const handleToast = (response) => {
    if (userdata?.id === response?.user) {
      toast.error(response.message);
    }
  };

  const handleSocketEvents = () => {
    const handleAuctionOpened = (response) => {
      console.log(response);
      if (!response.isOk) {
        handleToast(response);
        return;
      }
      new Audio("/notification.wav").play();
      toast.success(response.message, { duration: 5000 });
      if (currentBidData?.carId === response.carId) {
        dispatch(setBidData({ ...currentBidData, auctionStatus: true }));
      } else {
        dispatch(setBidData(response));
      }
    };

    const handleBidPlaced = (response) => {
      console.log(response);
      if (!response.isOk) {
        handleToast(response);
        return;
      }
      if (userdata.id === response.id) {
        new Audio("/notification.wav").play();
        toast.success(response.message, { duration: 5000 });
      } else if (
        userdata.id ===
        response.previousBidders[response.previousBidders.length - 1]
      ) {
        new Audio("/notification.wav").play();
        toast.error(response.outBidMessage);
      }
      dispatch(setBidData(response));
    };

    const handleAuctionStatusChanged = (response) => {
      console.log(response);
      if (!response.isOk) {
        handleToast(response);
        return;
      }
      if (userdata.id === response.userId) {
        new Audio("/notification.wav").play();
        toast.success(response.winnerMessage, { duration: 5000 });
      } else {
        new Audio("/notification.wav").play();
        toast.success(response.message, { duration: 5000 });
      }
      dispatch(setBidData(response));
    };

    const handleNotifyBidders = (response) => {
      console.log(response);
      if (!response.isOk) {
        handleToast(response);
        return;
      }
      new Audio("/notification.wav").play();
      toast.success(response.message, { duration: 5000 });
      dispatch(removeBidData());
    };

    if (socket) {
      socket.on("connect", () => console.log("Socket connected"));
      socket.on("disconnect", () => console.log("Socket disconnected"));
      socket.on("auctionOpened", handleAuctionOpened);
      socket.on("bidPlaced", handleBidPlaced);
      socket.on("auctionStatusChanged", handleAuctionStatusChanged);
      socket.on("notifybidders", handleNotifyBidders);

      return () => {
        socket.off("auctionOpened", handleAuctionOpened);
        socket.off("bidPlaced", handleBidPlaced);
        socket.off("auctionStatusChanged", handleAuctionStatusChanged);
        socket.off("notifybidders", handleNotifyBidders);
      };
    }
  };

  useEffect(handleSocketEvents, [socket, currentBidData]);

  const getUserData = async () => {
    try {
      const response = await fetch(`${backendURL}/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res_data = await response.json();
      if (response.ok) {
        dispatch(setUser({ userdata: res_data }));
      } else {
        console.warn(res_data.message || "Error in getting user data");
      }
    } catch (error) {
      console.error("Network error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <Routes>
          {/* Publics routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/verifyotp" element={<OTPVerificationForm />} />
          <Route path="/resetpassword" element={<Verificationform />} />
          <Route path="/auction-vehicle" element={<Vehicle />} />
          <Route path="/buynow-vehicle" element={<BuyfilterForm />} />
          <Route path="/privacy" element={<Privacypolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/auctioncar/:id" element={<Carsforsale />} />
          <Route path="/auction-events" element={<Events />} />
          <Route path="/buycar/:id" element={<Buycarforsale />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminHome />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="carlistings" element={<CarListings />} />
            <Route path="addauctionevent" element={<AddAuctionForm />} />
            <Route path="addbuynow" element={<AddBuyNow sellingType="fixed" />} />
            <Route path="auctionlistings" element={<AuctionListings />} />
            <Route path="addauction" element={<AddBuyNow sellingType="auction" />} />
            <Route path="auctioninventory" element={<AuctionInventory />} />
            <Route path="managecategories" element={<CategoryManagement />} />
            <Route path="allusers" element={<AllUsers />} />
            <Route path="userdetails" element={<UserDetail />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="deposit" element={<DepositDetail />} />
            <Route path="withdrawals" element={<Withdrawals />} />
            <Route path="withdraw" element={<WithdrawDetail />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="carsales/:id" element={<CarSales />} />
            <Route path="invoice/:id" element={<Invoice />} />
            <Route path="notifications" element={<NotifcationDetails />} />
          </Route>

          {/*User Routes*/}
          <Route path="user" element={<UserPanel />}>
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="userprofile" element={<Profile />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="invoice/:id" element={<UserInvoice />} />
            <Route path="notifications" element={<NotifcationDetails />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>
        </Routes>
          </ProtectedRoute>
      </Suspense>
    </LocalizationProvider>
  );
}

export default App;
