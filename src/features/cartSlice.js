import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      image: "/potatoe.png",
      productName: "Sweet Potatoe",
      price: 1100.98,
      quantity: 1,
      total: 1100.98,
    },
    {
      id: 2,
      image: "/potatoe.png",
      productName: "Irish Potatoe",
      price: 1000,
      quantity: 1,
      total: 1000,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
        product.total = product.quantity * product.price;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.total = product.quantity * product.price;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { incrementQuantity, decrementQuantity, removeProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
