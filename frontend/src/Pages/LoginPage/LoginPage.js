import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../Shared/Componenets/Form";
import { FormButton } from "../../Shared/Componenets/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setErrorStatus,
  setUserInfoOnStore,
} from "../../Features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
const LoginPage = () => {
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
    dispatch(setUserInfoOnStore(loginUser.data));
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

export default LoginPage;
