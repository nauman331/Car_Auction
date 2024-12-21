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
import Verificationform from "./components/usercomponents/Verificationform";
import Deposits from "./components/admincomponents/Deposits";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProtectedRoute>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verifyotp" element={<OTPVerificationForm />} />
          <Route path="/resetpassword" element={<Verificationform />} />

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
          </Route>
        </Routes>
      </ProtectedRoute>
    </LocalizationProvider>
  );
}

export default App;