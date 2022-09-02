import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
