import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await axios.get("/api/products", {
          headers: {
            "Content-Type": "application/json",
            Bearer: `${user.token}`,
          },
        });
        setProducts(allProducts.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [isDelete]);
  const handleDelete = (id) => {
    axios
      .delete(`/api/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsDelete(true);
  };
  if (isLoading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  if (user == null) {
    return (
      <div>
        <h1>Login to view your products</h1>
      </div>
    );
  }
  if (user !== null && products.length == 0) {
    return (
      <div>
        <h1>No Products to View</h1>
      </div>
    );
  }
  return (
    <Wrapper>
      {products.map((singleProduct) => {
        return (
          <ProductWrapper key={singleProduct.id}>
            <h2>{singleProduct.title}</h2>
            <p>Categories: {singleProduct.categories}</p>
            <p>
              Description:{" "}
              {singleProduct.description
                ? singleProduct.description
                : "No Description Provided by the owner"}
            </p>
            <p>Rent Price:{singleProduct.rentPrice}</p>
            <p>Rent Type:{singleProduct.rentType}</p>
            <ButtonContainer>
              <Link to={`/update-product/${singleProduct.id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => handleDelete(singleProduct.id)}>
                Delete
              </button>
            </ButtonContainer>
          </ProductWrapper>
        );
      })}
    </Wrapper>
  );
};

const ButtonContainer = styled.div`
  button {
    display: block;
  }
  display: flex;
  justify-content: space-between;
`;

const ProductWrapper = styled.div`
  width: 500px;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
`;

export default HomePage;
