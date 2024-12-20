import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {}, // Object to store categories with keys
    cars: [], // Array to store car data
    auctions: [], // Array to store auction data
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

    // Update the auctions list
    setAuctionsData: (state, action) => {
      const { auctions } = action.payload;
      state.auctions = auctions;
    },
  },
});

export const {
  setCategories,
  setCarsData,
  setAuctionsData,
} = categorySlice.actions;

export default categorySlice.reducer;
