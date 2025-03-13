import { createSlice } from "@reduxjs/toolkit";


const carColorSlice = createSlice({
name: "color",
  initialState : {
    currentCarColor: null
},
reducers: {
    setColor : (state, action) => {
        state.currentCarColor = action.payload;
    }
}
})

export const {setColor} = carColorSlice.actions;
export default carColorSlice.reducer;