import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
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
      {!isLoggedIn && (
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
      {isLoggedIn && (
        <Link
          to="/"
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          Logout
        </Link>
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
