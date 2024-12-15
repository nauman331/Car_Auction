import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {}, // Object to store categories with keys
    cars: [], // Array to store car data
    auctions: [], // Array to store auction data
    allusers: [], // Array to store user data
  },
  reducers: {
    setCategories: (state, action) => {
      const { key, items } = action.payload;
      state.categories[key] = items; // Dynamically update categories based on key
    },
    
    // Update the cars list (replace existing list)
    setCarsData: (state, action) => {
      const { cars } = action.payload;
      state.cars = cars; // Overwrite the cars array
    },

    // Add a new car to the existing list
    addCar: (state, action) => {
      const { car } = action.payload;
      state.cars = [...state.cars, car]; // Append new car to the array
    },

    // Update the auctions list
    setAuctionsData: (state, action) => {
      const { auctions } = action.payload;
      state.auctions = auctions;
    },
    addAuction: (state, action) => {
      const { auction } = action.payload;
      state.auctions = [...state.auctions, auction]; 
    },

    // Update the allusers list
    setAllUsers: (state, action) => {
      const { allusers } = action.payload;
      state.allusers = allusers;
    },

    // Delete a user by ID
    deleteUser: (state, action) => {
      state.allusers = state.allusers.filter((user) => user._id !== action.payload);
    },

    // Delete a car by ID
    deleteCar: (state, action) => {
      state.cars = state.cars.filter((car) => car._id !== action.payload);
    },

    // Delete an auction by ID
    deleteAuction: (state, action) => {
      state.auctions = state.auctions.filter((auction) => auction._id !== action.payload);
    },
  },
});


export const {
  setCategories,
  setCarsData,
  addCar, 
  setAuctionsData,
  deleteCar,
  deleteAuction,
  setAllUsers,
  deleteUser,
  addAuction
} = categorySlice.actions;

export default categorySlice.reducer;
