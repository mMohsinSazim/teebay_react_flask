import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: async (state) => {
      try {
        const allProducts = await axios.get("/api/products", {
          headers: {
            "Content-Type": "application/json",
            Bearer: `${JSON.parse(localStorage.getItem("user"))}`,
          },
        });
        console.log(allProducts.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;
