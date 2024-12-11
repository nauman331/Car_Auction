import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Config for redux-persist
const persistConfig = {
  key: "auth",
  storage,
};

// Persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth reducer
    category: categoryReducer, // Add the category reducer
  },
});

export const persistor = persistStore(store);
export default store;
