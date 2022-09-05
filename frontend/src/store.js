import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/User/userSlice";
import productReducer from "./Slices/Products/productSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
