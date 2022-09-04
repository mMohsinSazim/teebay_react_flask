import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <Wrapper>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return { color: isActive ? "white" : "grey" };
        }}
      >
        Home
      </NavLink>
      {user == null && (
        <>
          <NavLink
            to="sign-up"
            style={({ isActive }) => {
              return { color: isActive ? "white" : "grey" };
            }}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="login"
            style={({ isActive }) => {
              return { color: isActive ? "white" : "grey" };
            }}
          >
            Login
          </NavLink>
        </>
      )}
      {user !== null && (
        <>
          <NavLink
            to="/add-product"
            style={({ isActive }) => {
              return { color: isActive ? "white" : "grey" };
            }}
          >
            Add product
          </NavLink>
          <Link
            to="/"
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            Logout
          </Link>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  background-color: #6452ff;
  padding: 2rem;
  a {
    text-decoration: none;
    font-size: 1.5rem;
    margin: 0 1rem;
  }
`;

export default Navbar;
