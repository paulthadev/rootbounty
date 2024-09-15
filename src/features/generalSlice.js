import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSidebar: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
      // console.log(action.payload);
    },
  },
});

export const { setOpenSidebar } = generalSlice.actions;

export default generalSlice.reducer;
