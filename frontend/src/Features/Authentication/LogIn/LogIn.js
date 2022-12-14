import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, FormButton } from "../../../Shared";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setErrorStatus,
  setUserInfoOnStore,
} from "../../../Slices/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
const LogIn = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, errorMessage } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.email.trim() == "" || userInfo.password.trim() == "") {
      dispatch(
        setErrorStatus({ type: true, msg: "Provide email and password" })
      );
      setTimeout(() => {
        dispatch(setErrorStatus({ type: false, msg: null }));
      }, 2000);
      return;
    }
    const loginUser = await axios.post("/api/user/login", userInfo);
    if (!loginUser.data.token) {
      dispatch(setErrorStatus({ type: true, msg: "No user exists" }));
      setTimeout(() => {
        dispatch(setErrorStatus({ type: false, msg: null }));
      }, 2000);
      return;
    }
    localStorage.setItem("user", JSON.stringify(loginUser.data));
    dispatch(setUserInfoOnStore());
    navigate("/");
  };
  return (
    <div>
      <Form>
        <h3>Sign In</h3>
        {isError && <p className="form-error-msg">{errorMessage}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={userInfo.email}
            placeholder="Enail...."
            id="email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            value={userInfo.password}
            placeholder="Password..."
            id="password1"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        <FormButton type="submit" onClick={handleSubmit}>
          Login
        </FormButton>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>{" "}
        </p>
      </Form>
    </div>
  );
};

export default LogIn;
