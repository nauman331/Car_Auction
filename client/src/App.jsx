import { Routes, Route } from "react-router-dom";
import Auth from "./pages/userpages/Auth";
import Home from "./pages/userpages/Home";
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm";
import ResetPassword from "./components/usercomponents/ResetPassword";
import AdminHome from "./pages/adminpages/AdminHome";
import Dashboard from "./components/admincomponents/Dashboard";
import AddAuctionForm from "./components/admincomponents/AddAuction";
import AddBuyNow from "./components/admincomponents/AddBuyNow/AddBuyNow";
import CarListings from "./components/admincomponents/CarListings";
import AuctionListings from "./components/admincomponents/AuctionListings";
import CategoryManagement from "./components/admincomponents/Categories";
import Orders from "./components/admincomponents/Orders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verifyotp" element={<OTPVerificationForm />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="carlistings" element={<CarListings/> } />
          <Route path="addauctionevent" element={<AddAuctionForm /> } />
          <Route path="addbuynow" element={<AddBuyNow /> } />
          <Route path="auctionlistings" element={<AuctionListings/> } />
          <Route path="addauction" element={<AddBuyNow /> } />
          <Route path="managecategories" element={<CategoryManagement /> } />
          <Route path="Orders" element={<Orders /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
