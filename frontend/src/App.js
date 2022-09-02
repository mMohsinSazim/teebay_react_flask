import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
