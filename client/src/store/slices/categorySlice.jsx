import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {}, 
    cars: [],
    auctions: []
  },
  reducers: {
    setCategories: (state, action) => {
      const { key, items } = action.payload;
      state.categories[key] = items; 
    },
    setCarsData: (state, action) => {
      const {cars} = action.payload;
      state.cars = cars;
    },
    setAuctionsData: (state, action) => {
      const {auctions} = action.payload;
      state.auctions = auctions;
    }
  },
});

export const { setCategories, setCarsData, setAuctionsData } = categorySlice.actions;
export default categorySlice.reducer;
