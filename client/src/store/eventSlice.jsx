import { createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",
  initialState: {
    data: null,
  },
  reducers: {
    setEventData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setEventData } = eventSlice.actions
export default eventSlice.reducer
