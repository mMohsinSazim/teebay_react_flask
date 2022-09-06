import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  products: [],
  isLoading: false,
  isDeleted: false,
  isUpdated: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (requestInfo) => {
    const { url, token } = requestInfo;
    try {
      const resp = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (requestInfo) => {
    const { url, token } = requestInfo;
    try {
      const resp = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (requestInfo) => {
    const { url, data, token } = requestInfo;
    try {
      const resp = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.products = action.payload.data;
    },
    [fetchProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isUpdated = true;
    },
    [updateProduct.rejected]: (state) => {
      state.isLoading = false;
      state.isUpdated = false;
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isDeleted = true;
    },
    [deleteProduct.rejected]: (state) => {
      state.isLoading = false;
      state.isDeleted = false;
    },
  },
});

export default productSlice.reducer;
