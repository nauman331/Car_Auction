import { Routes, Route } from "react-router-dom";
import Auth from "./pages/userpages/Auth";
import Home from "./pages/userpages/Home";
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm";
import ResetPassword from "./components/usercomponents/ResetPassword";
import AdminHome from "./pages/adminpages/AdminHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verifyotp" element={<OTPVerificationForm />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route path="dashboard" element={""} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
