import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./features/generalSlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    cart: cartSlice,
  },
});

export default store;
