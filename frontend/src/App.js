import "./App.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Navbar from "./Shared/Componenets/Navbar";
import axios from "axios";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
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
