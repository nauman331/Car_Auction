import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import socketReducer from "./socketSlice";
import eventReducer from "./eventSlice";
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

const socketEventPersistConfig = {
  key: "eventdata",
  storage
}

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);
const persistedSocketEventReducer = persistReducer(socketEventPersistConfig, eventReducer);

// Create the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth reducer
    category: persistedCategoryReducer, // Persisted category reducer
    socket: socketReducer,
    event: persistedSocketEventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["socket/setSocket", "persist/REHYDRATE"],
        // Ignore these paths in the state
        ignoredPaths: ["socket.socket"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
