import { Routes, Route, useNavigate, replace } from "react-router-dom";
import Auth from "./pages/userpages/Auth";
import Home from "./pages/userpages/Home";
import ContactUs from "./pages/userpages/contact-us";
import Aboutus from "./pages/userpages/about-us";
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm";
import AdminHome from "./pages/adminpages/AdminHome";
import Dashboard from "./components/admincomponents/Dashboard";
import AddAuctionForm from "./components/admincomponents/AddAuction";
import AddBuyNow from "./components/admincomponents/AddBuyNow/AddBuyNow";
import CarListings from "./components/admincomponents/CarListings";
import AuctionListings from "./components/admincomponents/AuctionListings";
import Events from "./pages/userpages/auction-events";
import Privacypolicy from "./pages/userpages/privacy";
import Terms from "./pages/userpages/terms";
import CategoryManagement from "./components/admincomponents/Categories";
import Withdraw from "./components/usercomponents/withdrawform";
import Orders from "./components/admincomponents/Orders";
import AuctionInventory from "./components/admincomponents/AuctionInventory";
import Profile from "./components/admincomponents/Profile";
import AllUsers from "./components/admincomponents/AllUsers";
import ProtectedRoute from "./utils/ProtectedRoute";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/stylesheets/car responsive.scss";
import Verificationform from "./components/usercomponents/Verificationform";
import Deposits from "./components/admincomponents/Deposits";
import CarSales from "./components/admincomponents/carsale";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setBidData, removeBidData } from "./store/eventSlice";
import UserPanel from "./pages/userpages/UserPanel";
import Wallet from "./components/usercomponents/userpanel/Wallet";
import Carsforsale from "./pages/userpages/car";
import Vehicle from "./pages/userpages/auction-vehicle";
import BuyfilterForm from "./pages/userpages/buynow-vehicle";
import Buycarforsale from "./pages/userpages/buycar";
import { backendURL } from "./utils/Exports";
import { setUser } from "./store/slices/authSlice";
import DepositDetail from "./components//admincomponents/DepositDetail";
import UserDashboard from "./components//usercomponents/userpanel/Dashboard";
import UserOrders from "./components/usercomponents/userpanel/Orders";
import Invoice from "./components/admincomponents/Invoice";
import UserInvoice from "./components/usercomponents//userpanel/Invoice";
import NotifcationDetails from "./components/admincomponents/NotificationDetails";
import UserDetail from "./components/admincomponents/UserDetail";
import Withdrawals from "./components/admincomponents/Withdrawals";
import WithdrawDetail from "./components/admincomponents/WithdrawDetail";
import PageNotFound from "./pages/userpages/page-not-found";

function App() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { currentBidData } = useSelector((state) => state.event);
  const { token, userdata } = useSelector((state) => state.auth);
  const navigate = useNavigate()

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
      dispatch(setBidData(response));
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
      const currentPath = window.location.pathname.replace(/\/$/, "");
      const expectedPath = `/auctioncar/${String(response.carId)}`.replace(/\/$/, "");

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

      dispatch(removeBidData());

      if (!response.nextCar || !response.nextCar._id) {
        if (currentPath.startsWith("/auctioncar/") && currentPath === expectedPath) {
          setTimeout(() => {
            navigate("/", { replace: true });
            return;
          }, 0);
        }
      }

      const navigatingCar = String(response.nextCar._id);

      if (currentPath.startsWith("/auctioncar/") && currentPath === expectedPath) {
        setTimeout(() => {
          if (String(response.carId) === navigatingCar) {
            console.log("Navigating to Homepage");
            navigate("/", { replace: true });
          } else {
            console.log(`Navigating to /auctioncar/${navigatingCar}`);
            navigate(`/auctioncar/${navigatingCar}`, { replace: true });
          }
        }, 0);
      }
    };


    const handleNotifyBidders = (response) => {
      const currentPath = window.location.pathname.replace(/\/$/, "");
      const expectedPath = `/auctioncar/${String(response.carId)}`.replace(/\/$/, "");

      if (!response.isOk) {
        handleToast(response);
        return;
      }

      new Audio("/notification.wav").play();
      toast.success(response.message, { duration: 5000 });
      dispatch(removeBidData());

      if (!response.nextCar || !response.nextCar._id) {
        if (!response.nextCar || !response.nextCar._id) {
          if (currentPath.startsWith("/auctioncar/") && currentPath === expectedPath) {
            setTimeout(() => {
              navigate("/", { replace: true });
              return;
            }, 0);
          }
        }
      }

      const navigatingCar = String(response.nextCar._id);

      console.log("Current Car ID:", response.carId);
      console.log("Navigating Car ID:", navigatingCar);

      if (currentPath.startsWith("/auctioncar/") && currentPath === expectedPath) {
        setTimeout(() => {
          if (String(response.carId) === navigatingCar) {
            console.log("Navigating to Homepage");
            navigate("/", { replace: true });
          } else {
            console.log(`Navigating to /auctioncar/${navigatingCar}`);
            navigate(`/auctioncar/${navigatingCar}`, { replace: true });
          }
        }, 0);
      }
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
      <ProtectedRoute>
        <Routes>
          {/* Public routes */}
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
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ProtectedRoute>
    </LocalizationProvider>
  );
}

export default App;
