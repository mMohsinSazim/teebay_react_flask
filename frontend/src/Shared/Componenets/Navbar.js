import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const Navbar = () => {
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
      <NavLink
        to="logout"
        style={({ isActive }) => {
          return { color: isActive ? "white" : "grey" };
        }}
      >
        Logout
      </NavLink>
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
