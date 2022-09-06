import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { deleteProduct } from "../Slices/Products/productSlice";
import { UpdateButton, DeleteButton } from "../Shared/Componenets/Button";
const ProductDetails = ({
  categories,
  description,
  price,
  rentPrice,
  rentType,
  title,
  id,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProduct({ url: `/api/product/${id}`, token: user.token }));
  };
  return (
    <div>
      <ProductWrapper>
        <h2>{title}</h2>
        <p>
          <b>Categories:</b> <i>{categories}</i>
        </p>
        <p>
          <b>Price:</b> <i>${price}</i>
        </p>
        <p>
          <b>Description: </b>
          {description ? description : "No Description Provided by the owner"}
        </p>
        <p>
          <b>Rent Price:</b> ${rentPrice}
        </p>
        <p>
          {" "}
          <b>Rent Type</b> {rentType}
        </p>
        <ButtonContainer>
          <Link to={`/update-product/${id}`}>
            <UpdateButton>Update</UpdateButton>
          </Link>
          <DeleteButton onClick={() => handleDelete(id)}>Delete</DeleteButton>
        </ButtonContainer>
      </ProductWrapper>
    </div>
  );
};
export default ProductDetails;

const ButtonContainer = styled.div`
  a {
    text-decoration: none;
  }
  button {
    display: block;
  }
  display: flex;
  justify-content: center;
`;

const ProductWrapper = styled.div`
  width: 500px;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  p {
    margin: 10px 0;
  }
`;
