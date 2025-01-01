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
  },
});

export const {
  setCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
