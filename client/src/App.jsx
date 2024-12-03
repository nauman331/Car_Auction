import { Routes, Route } from "react-router-dom";
import Auth from "./pages/userpages/Auth";
import Home from "./pages/userpages/Home";
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm";
import ResetPassword from "./components/usercomponents/ResetPassword";
import AdminHome from "./pages/adminpages/AdminHome";
import Dashboard from "./components/admincomponents/Dashboard";
import AddAuctionForm from "./components/admincomponents/AddAuction";
import AddBuyNow from "./components/admincomponents/AddBuyNow";

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
          <Route path="addauction" element={<AddAuctionForm /> } />
          <Route path="addbuynow" element={<AddBuyNow /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
