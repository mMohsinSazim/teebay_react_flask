import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../Shared/Componenets/Form";
import { FormButton } from "../../Shared/Componenets/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  setErrorStatus,
  setUserInfoOnStore,
} from "../../Features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isError, errorMessage } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    password1: "",
    password2: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      address,
      password1,
      password2,
      phoneNumber,
    } = userInfo;
    if (firstName.trim() == "" && lastName.trim() == "") {
      dispatch(
        setErrorStatus({
          type: true,
          msg: "Please insert your first name or last name",
        })
      );
      setTimeout(() => {
        dispatch(
          setErrorStatus({
            type: false,
            msg: null,
          })
        );
      }, 2000);
      return;
    }
    if (
      email.trim() == "" ||
      password1.trim() == "" ||
      password2.trim() == ""
    ) {
      dispatch(
        setErrorStatus({ type: true, msg: "Provide email and Password" })
      );
      setTimeout(() => {
        dispatch(setErrorStatus({ type: false, msg: null }));
      }, 2000);
      return;
    }
    if (password1 !== password2) {
      dispatch(
        setErrorStatus({
          type: true,
          msg: "Passwords do not match.",
        })
      );
      setTimeout(() => {
        dispatch(
          setErrorStatus({
            type: false,
            msg: null,
          })
        );
      }, 2000);
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      password: password2,
    };
    const signUpUser = await axios.post("/api/user/sign-up", data);
    if (signUpUser.data.message !== "User was created") {
      dispatch(
        setErrorStatus({ type: true, msg: `${signUpUser.data.message}` })
      );
      setTimeout(() => {
        dispatch(setErrorStatus({ type: false, msg: null }));
      }, 2000);
      return;
    } else {
      const registeredUser = { email: data.email, password: data.password };
      const loginUser = await axios.post("/api/user/login", registeredUser);
      localStorage.setItem("user", JSON.stringify(loginUser.data));
      dispatch(setUserInfoOnStore());
      navigate("/");
    }
  };
  return (
    <div>
      <Form>
        <h3>Sign Up</h3>
        {isError && <p className="form-error-msg">{errorMessage}</p>}
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={userInfo.lastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            value={userInfo.phoneNumber}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phoneNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            value={userInfo.password1}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password1: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            value={userInfo.password2}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password2: e.target.value })
            }
          />
        </div>
        <FormButton type="submit" onClick={handleSubmit}>
          Sign Up
        </FormButton>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>{" "}
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;
