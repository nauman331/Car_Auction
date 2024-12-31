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
  },
})

export const { setBidData } = eventSlice.actions
export default eventSlice.reducer