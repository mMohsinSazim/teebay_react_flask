import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../Shared/Componenets/Form";
import { FormButton } from "../../Shared/Componenets/Button";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.email.trim() == "" || userInfo.password.trim() == "") {
      console.log("Email or Password is Empty");
      return;
    }
    const loginUser = await axios.post("/api/user/login", userInfo);
    console.log(loginUser);
  };
  return (
    <div>
      <Form>
        <h3>Sign In</h3>
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
