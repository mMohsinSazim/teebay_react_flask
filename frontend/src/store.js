import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/User/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
