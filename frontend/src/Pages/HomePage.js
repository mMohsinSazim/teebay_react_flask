import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchProducts } from "../Slices/Products/productSlice";
import ProductDetails from "./ProductDetails";
export const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { products, isDeleted, isUpdated } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const fetchInfo = {
          url: "/api/products",
          token: `${user.token}`,
        };
        dispatch(fetchProducts(fetchInfo));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [isDeleted, isUpdated]);

  if (isLoading) {
    return (
      <div className="display-msg">
        <h1>Loading....</h1>
      </div>
    );
  }
  if (user == null) {
    return (
      <div className="display-msg">
        <h1>Login to view your products</h1>
      </div>
    );
  }
  if (user !== null && products.length == 0) {
    return (
      <div className="display-msg">
        <h1>No Products to View</h1>
      </div>
    );
  }
  return (
    <Wrapper>
      {products.map((singleProduct) => {
        return <ProductDetails {...singleProduct} key={singleProduct.id} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
`;
