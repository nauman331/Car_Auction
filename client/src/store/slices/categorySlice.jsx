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
      const { cars } = action.payload;
      state.cars = cars;
    },
    setAuctionsData: (state, action) => {
      const { auctions } = action.payload;
      state.auctions = auctions;
    },
    deleteCar: (state, action) => {
      state.cars = state.cars.filter((car) => car._id !== action.payload); // Remove car by ID
    },
    deleteAuction: (state, action) => {
      state.auctions = state.auctions.filter((auction) => auction._id !== action.payload); // Remove auction by ID
    },
  },
});

export const { setCategories, setCarsData, setAuctionsData, deleteCar, deleteAuction } = categorySlice.actions;
export default categorySlice.reducer;
