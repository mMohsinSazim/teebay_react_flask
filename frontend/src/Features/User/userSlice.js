import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: userInfo,
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setErrorStatus: (state, action) => {
      const { type, msg } = action.payload;
      state.isError = type;
      state.errorMessage = msg;
    },
    setUserInfoOnStore: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { setErrorStatus, setUserInfoOnStore, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
