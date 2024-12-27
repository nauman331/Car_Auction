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
import { backendURL } from "./utils/Exports.jsx"

// Initialize socket.io-client
console.log("Connecting to socket.io server at:", backendURL)
const socket = io(backendURL.replace('/api', ''), {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
