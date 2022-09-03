import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
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
    setUserInfoOnStore: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

export const { setErrorStatus, setUserInfoOnStore, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
