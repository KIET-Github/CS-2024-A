import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "Book",
  initialState: {
    bookingList: [],
  },
  reducers: {
    setBookingList: (state, action) => {
      state.bookingList = action.payload;
    },
  },
});
export const {setBookingList} = bookSlice.actions;
export default bookSlice.reducer;
