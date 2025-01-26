import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store, { persistor } from "./store/store.jsx"
import { PersistGate } from "redux-persist/integration/react"
import { io } from "socket.io-client"
import { setSocket } from "./store/socketSlice"
import { socketURL } from "./utils/Exports.jsx"
// import { PayPalScriptProvider } from "@paypal/react-paypal-js"

// Initialize socket.io-client
const socket = io(socketURL, {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  timeout: 20000,
})

socket.on("connect", () => {
  console.log("Socket connected")
})

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err)
})

socket.on("disconnect", () => {
  console.log("Socket disconnected")
})

store.dispatch(setSocket(socket))

// const initialOptions = {
//   "client-id": "ATBXxkrO205je6XnJrEW8W2xj9RTh4UlgFq8hk-oqdGCgY6IFJrjb-u58cT9NTsJSydHxdmFtQbD4CNt",
//   currency: "USD",
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <PayPalScriptProvider options={initialOptions}> */}
            <App />
          {/* </PayPalScriptProvider> */}
        </PersistGate>
      </Provider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
