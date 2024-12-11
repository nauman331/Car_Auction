import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {}, // Changed to an object for better flexibility
  },
  reducers: {
    setCategories: (state, action) => {
      const { key, items } = action.payload;
      state.categories[key] = items; // Store categories based on their keys
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
