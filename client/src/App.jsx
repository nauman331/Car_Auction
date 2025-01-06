import { Routes, Route } from "react-router-dom";
import Auth from "./pages/userpages/Auth";
import Home from "./pages/userpages/Home";
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm";
import AdminHome from "./pages/adminpages/AdminHome";
import Dashboard from "./components/admincomponents/Dashboard";
import AddAuctionForm from "./components/admincomponents/AddAuction";
import AddBuyNow from "./components/admincomponents/AddBuyNow/AddBuyNow";
import CarListings from "./components/admincomponents/CarListings";
import AuctionListings from "./components/admincomponents/AuctionListings";
import CategoryManagement from "./components/admincomponents/Categories";
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
import CarSales from "./components/admincomponents/carsale"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast";
import { setBidData, removeBidData } from "./store/eventSlice"
import UserPanel from "./pages/userpages/UserPanel";
import Wallet from "./components/usercomponents/userpanel/Wallet";
import Carsforsale from "./pages/userpages/car";
import Vehicle from "./pages/userpages/vehicle";
import BuyfilterForm from "./pages/userpages/buynowlist";
import Buycarforsale from "./pages/userpages/buycar";
import { backendURL } from "./utils/Exports";
import { setUser } from "./store/slices/authSlice";
import DepositDetail from "./components//admincomponents/DepositDetail"
import UserDashboard from "./components//usercomponents/userpanel/Dashboard"
import UserOrders from "./components/usercomponents/userpanel/Orders"
import Invoice from "./components/admincomponents/Invoice";

function App() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket)
  const { currentBidData } = useSelector(state => state.event);
  const { token, userdata } = useSelector(state => state.auth);

  const handleToast = (response) => {
    if(userdata?.id === response?.id) {
      toast.error(response.message);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.on("auctionOpened", (response) => {
        if (!response.isOk) {
          handleToast(response);
          return;
        }

        const audio = new Audio("/notification.wav");
        audio.play();
        toast.success(response.message, {
          duration: 5000,
        });

        if (currentBidData?.carId === response.carId) {
          // Update auctionStatus if carId matches
          dispatch(setBidData({ ...currentBidData, auctionStatus: true }));
        } else {
          dispatch(setBidData(response));
        }
      });

      socket.on("bidPlaced", (response) => {
        if (!response.isOk) {
          console.log(response)
          handleToast(response);
          return;
        }
        const audio = new Audio("/notification.wav");
        audio.play();
        toast.success(response.message, {
          duration: 5000,
        });

        dispatch(setBidData(response));
      });

      socket.on("auctionStatusChanged", (response) => {
        if (!response.isOk) {
          handleToast(response);
          return;
        }
        const audio = new Audio("/notification.wav");
        audio.play();
        toast.success(response.message, {
          duration: 5000,
        });
        console.log(response);
        dispatch(setBidData(response));
      });

      socket.on("notifybidders", (response) => {
        if (!response.isOk) {
          handleToast(response);
          return;
        }
        const audio = new Audio("/notification.wav");
        audio.play();
        if(userdata?.id === response?.user) {
        toast.success(response.message, {
          duration: 5000,
        });
      }
        console.log(response);
        dispatch(removeBidData());
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("auctionOpened");
        socket.off("bidPlaced");
        socket.off("auctionStatusChanged");
        socket.off("notifybidders");
      };
    }
  }, [socket, currentBidData, dispatch]);

  const getUserData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
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
        console.warn(res_data.message || "Error in getting user data");
      }
    } catch (error) {
      console.warn("Error in fetching user data");
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
          <Route path="/verifyotp" element={<OTPVerificationForm />} />
          <Route path="/resetpassword" element={<Verificationform />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/buynowlist" element={<BuyfilterForm />} />
          <Route path="/auctioncar/:id" element={<Carsforsale />} />
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
            <Route path="deposits" element={<Deposits />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="deposit" element={<DepositDetail />} />
            <Route path="carsales/:id" element={<CarSales />} />
            <Route path="invoice/:id" element={<Invoice />} />
          </Route>

          {/*User Routes*/}
          <Route path="user" element={<UserPanel />}>
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="userprofile" element={<Profile />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
        </Routes>
      </ProtectedRoute>
    </LocalizationProvider>
  );
}

export default App;