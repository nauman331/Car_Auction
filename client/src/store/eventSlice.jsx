import { createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",
  initialState: {
    currentBidData: null, // Ensure this is set correctly
  },
  reducers: {
    setBidData: (state, action) => {
      state.currentBidData = action.payload
    },
    removeBidData: (state) => {
      state.currentBidData = null
    },
  },
})

export const { setBidData, removeBidData } = eventSlice.actions
export default eventSlice.reducer