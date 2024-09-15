import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const defaultState = {
  cart: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage,
  reducers: {
    addItemToCart: (state, { payload }) => {
      const { product } = payload;
      const item = state.cart.find((item) => {
        return item.product_id === product.product_id;
      });

      if (item) {
        item.quantity += item.quantity;
        toast.success("quantity increased");
      } else {
        state.cart.push(product);

        toast.success("item added to cart");
      }

      localStorage.setItem("cart", JSON.stringify(state));
      console.log(state.cart);
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find((p) => p.product_id === action.payload);
      if (product) {
        product.quantity += 1;
        product.total = product.quantity * product.price;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find((p) => p.product_id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.total = product.quantity * product.price;
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((p) => p.product_id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
