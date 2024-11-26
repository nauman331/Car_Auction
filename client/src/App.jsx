import {Routes, Route} from "react-router-dom"
import Auth from "./pages/userpages/Auth"
import Home from "./pages/userpages/Home"
import OTPVerificationForm from "./components/usercomponents/OTPVerificationForm"


function App() {

  return (
    <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/verifyotp" element={<OTPVerificationForm  />} />
    
  </Routes>
    </>
  )
}

export default App
