import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Config for redux-persist
const authPersistConfig = {
  key: "auth",
  storage,
};

const categoryPersistConfig = {
  key: "category",
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);

// Create the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth reducer
    category: persistedCategoryReducer, // Persisted category reducer
  },
});

export const persistor = persistStore(store);
export default store;
