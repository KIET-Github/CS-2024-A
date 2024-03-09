import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedin: false,
  },
  reducers: {
    setAuthLoggedinState: (state, action) => {
      state.isLoggedin = action.payload;
    },
  },
});
export const {setAuthLoggedinState} = authSlice.actions;
export default authSlice.reducer;
