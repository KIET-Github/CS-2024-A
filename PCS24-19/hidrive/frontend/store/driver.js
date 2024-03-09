import { createSlice } from "@reduxjs/toolkit";

export const driverSlice = createSlice({
  name: "driver",
  initialState: {
    driverList: [],
  },
  reducers: {
    setDriverList: (state, action) => {
      state.driverList = action.payload;
    },
  },
});
export const {setDriverList} = driverSlice.actions;
export default driverSlice.reducer;
