import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const SignUpPage = () => {
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
      console.log("Please insert your first name or last name");
      return;
    }
    if (password1 !== password2) {
      console.log("Please check if passwords are ok or not");
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
    console.log(signUpUser);
  };
  return (
    <div>
      <form>
        <h3>Sign Up</h3>
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
            required
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
            required
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
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
