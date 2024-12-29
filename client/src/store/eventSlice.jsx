import { createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",
  initialState: {
    currentBid: null,
  },
  reducers: {
    setBidData: (state, action) => {
      state.currentBid = action.payload
    },
  },
})

export const { setBidData } = eventSlice.actions
export default eventSlice.reducer
